import ButtonAppBar from "./components/AppBar";
import { getUser } from "./store/auth";
import Cookies from "js-cookie";
import { Outlet, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");

  async function fetchUsers() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      dispatch(getUser(user));
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <ButtonAppBar />
      <Outlet />
    </>
  );
}

export default App;
