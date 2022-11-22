import React from "react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Container } from "@mui/system";
import Cookies from "js-cookie";

import TransactionsList from "../components/TransactionsList";
import TransactionChart from "../components/TransactionChart";
function Home() {
  const [transactions, setTransactions] = useState([]);
  const [edittransactions, setEditTransactions] = useState({});

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const token = Cookies.get("token");
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }
  return (
    <Container>
      <TransactionChart data={transactions} />
      <Card
        edittransactions={edittransactions}
        fetchTransctions={fetchTransctions}
      />
      <TransactionsList
        data={transactions}
        fetchTransctions={fetchTransctions}
        setEditTransactions={setEditTransactions}
      />
    </Container>
  );
}

export default Home;
