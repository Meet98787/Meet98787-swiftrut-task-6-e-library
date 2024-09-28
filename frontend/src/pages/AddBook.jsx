// src/pages/AddBook.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Grid, 
  Paper 
} from '@mui/material';
import api from "../api/api"; // Import your Axios instance for API requests

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    availableCopies: 1,
    image: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("genre", formData.genre);
    data.append("publicationDate", formData.publicationDate);
    data.append("availableCopies", formData.availableCopies);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await api.post("/books", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Book added successfully!");
      navigate("/my-books");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add a New Book
        </Typography>
        {error && (
          <Typography color="error" align="center" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" align="center" gutterBottom>
            {success}
          </Typography>
        )}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                variant="outlined"
                fullWidth
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Genre"
                variant="outlined"
                fullWidth
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Publication Date"
                type="date"
                variant="outlined"
                fullWidth
                name="publicationDate"
                value={formData.publicationDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Available Copies"
                type="number"
                variant="outlined"
                fullWidth
                name="availableCopies"
                value={formData.availableCopies}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Book Cover Image"
                type="file"
                variant="outlined"
                fullWidth
                name="image"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Add Book
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddBook;
