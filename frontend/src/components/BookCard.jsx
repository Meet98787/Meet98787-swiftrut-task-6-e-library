// src/components/BookCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  // Redirect to book details on click
  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{ cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 6 } }}
    >
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
          By: {book.author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Published: {new Date(book.publicationDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="textPrimary" sx={{ mt: 1 }}>
          Available Copies: {book.availableCopies}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleClick}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;
