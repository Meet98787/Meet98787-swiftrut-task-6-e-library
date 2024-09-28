// src/pages/MyBooks.js
import React, { useEffect, useState } from "react";
import api from "../api/api"; // Import the Axios instance for making API requests
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Alert,
  CardActions,
} from "@mui/material";

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch books added by the logged-in user
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books/mycreatedbooks");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        setError("Failed to fetch books. Please try again later.");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle Delete book
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/books/${bookId}`);
        setBooks(books.filter((book) => book._id !== bookId)); // Update UI by removing deleted book
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  // Navigate to edit book page
  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        This is your bookshelf
      </Typography>

      {books.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          You have not added any books yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {books.map((book) => (
            <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                {/* Book Image */}
                <CardMedia
                  component="img"
                  height="350"
                  image={
                    book.imageUrl
                      ? `http://localhost:5000${book.imageUrl}`
                      : "/no-image.png"
                  }
                  alt={book.title}
                />

                {/* Book Details */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    By {book.author}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Genre: {book.genre}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Published: {new Date(book.publicationDate).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Available Copies: {book.availableCopies}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Status: {book.available ? "Available" : "Not Available"}
                  </Typography>

                  {/* Borrowed By */}
                  {book.borrowedBy && book.borrowedBy.length > 0 ? (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Borrowed by:
                      </Typography>
                      {book.borrowedBy.map((user) => (
                        <Typography variant="body2" key={user._id}>
                          {user.name} ({user.email})
                        </Typography>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Not borrowed yet
                    </Typography>
                  )}
                </CardContent>

                {/* Edit and Delete Buttons */}
                <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FaEdit />}
                    onClick={() => handleEdit(book._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<FaTrash />}
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default MyBooks;
