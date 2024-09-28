// src/pages/EditBook.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import api from "../api/api"; // Axios instance for API requests

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    availableCopies: 1,
  });
  const [image, setImage] = useState(null); // State for storing the new image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the current book details using the book ID
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        const book = response.data;
        setFormData({
          title: book.title,
          author: book.author,
          genre: book.genre,
          publicationDate: book.publicationDate.split("T")[0], // Format for date input
          availableCopies: book.availableCopies,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to load book details.");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for the image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("author", formData.author);
    updatedData.append("genre", formData.genre);
    updatedData.append("publicationDate", formData.publicationDate);
    updatedData.append("availableCopies", formData.availableCopies);

    if (image) {
      updatedData.append("image", image); // Append the image only if it's updated
    }

    try {
      await api.put(`/books/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data", // For handling file uploads
        },
      });
      navigate("/my-books"); // Redirect to "My Books" page after successful update
    } catch (error) {
      console.error("Error updating the book:", error);
      setError("Failed to update the book. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Book
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Publication Date"
                type="date"
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Available Copies"
                type="number"
                name="availableCopies"
                value={formData.availableCopies}
                onChange={handleInputChange}
                inputProps={{ min: 1 }}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Upload New Image"
                type="file"
                name="image"
                onChange={handleImageChange}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Update Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditBook;
