// src/pages/Home.js
import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, CircularProgress, Alert, Box } from "@mui/material";
import api from "../api/api"; // Ensure API instance is imported
import BookCard from "../components/BookCard"; // Import BookCard component

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all books from backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data); // Store fetched books in state
        setLoading(false);
      } catch (err) {
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Explore Our Popular Books
      </Typography>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
