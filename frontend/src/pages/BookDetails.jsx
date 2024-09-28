// src/pages/BookDetails.js
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        setBook(response.data);
        setLoading(false);

        if (user && response.data.borrowedBy.includes(user._id)) {
          setIsBorrowed(true);
        }
      } catch (err) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, user]);

  const handleBorrow = async () => {
    try {
      await api.post(`/books/${id}/borrow`);
      setIsBorrowed(true);
      setBook((prevBook) => ({
        ...prevBook,
        availableCopies: prevBook.availableCopies - 1,
      }));
    } catch (err) {
      setError("Error borrowing book");
    }
  };

  const handleReturn = async () => {
    try {
      await api.post(`/books/${id}/return`);
      setIsBorrowed(false);
      setBook((prevBook) => ({
        ...prevBook,
        availableCopies: prevBook.availableCopies + 1,
      }));
    } catch (err) {
      setError("Error returning book");
    }
  };

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
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book Details
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        Discover the story behind this book
      </Typography>

      {book && (
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Grid container spacing={4}>
            {/* Book Details - Left Side */}
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {book.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                By {book.author}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                <strong>Genre:</strong> {book.genre}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                <strong>Published:</strong>{" "}
                {new Date(book.publicationDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                <strong>Available Copies:</strong> {book.availableCopies}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {book.description}
              </Typography>

              {user && (
                <Box sx={{ mt: 4 }}>
                  {isBorrowed ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleReturn}
                      fullWidth
                    >
                      Return Book
                    </Button>
                  ) : book.availableCopies > 0 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleBorrow}
                      fullWidth
                    >
                      Borrow Book
                    </Button>
                  ) : (
                    <Typography color="error" variant="body1">
                      No copies available for borrowing
                    </Typography>
                  )}
                </Box>
              )}
            </Grid>

            {/* Book Image - Right Side */}
            <Grid item xs={12} md={6} display="flex" justifyContent="center">
              <Box
                component="img"
                src={
                  book.imageUrl
                    ? `http://localhost:5000${book.imageUrl}`
                    : "/no-image.png"
                }
                alt={book.title}
                sx={{
                  width: "100%",
                  maxWidth: 400,
                  borderRadius: 2,
                  border: "8px solid yellow",
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default BookDetails;
