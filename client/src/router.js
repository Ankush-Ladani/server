import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import App from "./App";
import Home from "./pages/Home";
import Register from "./pages/Register";
import CheckAuth from "./utils/CheckAuth.js";
import Guest from "./utils/Guest";

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
        // element: token ? <Home /> : <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },
    ],
  },
]);
