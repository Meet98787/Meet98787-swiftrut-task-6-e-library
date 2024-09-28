// src/pages/Home.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import api from "../api/api"; // Ensure API instance is imported
import BookCard from "../components/BookCard"; // Import BookCard component

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genre: "",
    author: "",
    publicationYear: "",
  });

  // Fetch all books from backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data); // Store fetched books in state
        setFilteredBooks(response.data); // Initialize filtered books
        setLoading(false);
      } catch (err) {
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = books;

    if (filters.genre) {
      filtered = filtered.filter((book) => book.genre === filters.genre);
    }

    if (filters.author) {
      filtered = filtered.filter((book) => book.author === filters.author);
    }

    if (filters.publicationYear) {
      filtered = filtered.filter(
        (book) =>
          new Date(book.publicationDate).getFullYear().toString() ===
          filters.publicationYear
      );
    }

    setFilteredBooks(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ genre: "", author: "", publicationYear: "" });
    setFilteredBooks(books);
  };

  const uniqueGenres = [...new Set(books.map((book) => book.genre))];
  const uniqueAuthors = [...new Set(books.map((book) => book.author))];
  const uniqueYears = [
    ...new Set(
      books.map((book) => new Date(book.publicationDate).getFullYear().toString())
    ),
  ];

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

      {/* Filter Controls */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select
              name="genre"
              value={filters.genre}
              onChange={handleFilterChange}
              label="Genre"
            >
              <MenuItem value="">All Genres</MenuItem>
              {uniqueGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel>Author</InputLabel>
            <Select
              name="author"
              value={filters.author}
              onChange={handleFilterChange}
              label="Author"
            >
              <MenuItem value="">All Authors</MenuItem>
              {uniqueAuthors.map((author) => (
                <MenuItem key={author} value={author}>
                  {author}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <FormControl fullWidth>
            <InputLabel>Publication Year</InputLabel>
            <Select
              name="publicationYear"
              value={filters.publicationYear}
              onChange={handleFilterChange}
              label="Publication Year"
            >
              <MenuItem value="">All Years</MenuItem>
              {uniqueYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="center">
          <Button variant="outlined" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Grid>
      </Grid>

      {/* Display Books */}
      <Grid container spacing={4}>
        {filteredBooks.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={3}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
