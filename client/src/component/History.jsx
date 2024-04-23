import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/transactions`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredTransactions = transactions.filter(
    (transaction) => !filterType || transaction.type === filterType
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return new Date(b.date) - new Date(a.date);
    }
  });

  const handleDeleteTransaction = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/transactions/${id}`);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div>
      <h3>History Component</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <FormControl style={{ marginBottom: "1rem" }}>
          <InputLabel>Filter by Type</InputLabel>
          <Select value={filterType} onChange={handleFilterChange}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ marginBottom: "1rem" }}>
          <InputLabel>Sort Order</InputLabel>
          <Select value={sortOrder} onChange={handleSortOrderChange}>
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        {sortedTransactions.map((transaction) => (
          <Card
            key={transaction.id}
            variant="outlined"
            sx={{ mb: 2, width: "100%", maxWidth: 400 }}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                Type: {transaction.type}
              </Typography>
              <Typography variant="body1" component="div">
                Category: {transaction.category}
              </Typography>
              <Typography variant="body1" component="div">
                Amount: {transaction.amount}
              </Typography>
              <Typography variant="body1" component="div">
                Date: {transaction.date}
              </Typography>
              <Button
                onClick={() => handleDeleteTransaction(transaction.id)}
                variant="contained"
                color="error"
                sx={{ mt: 1 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default History;
