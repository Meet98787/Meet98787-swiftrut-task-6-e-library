// src/pages/Register.js
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter, FaLinkedinIn } from "react-icons/fa"; // Importing icons
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Grid,
  IconButton,
  Alert,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(""); // State for error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      await register(formData.username, formData.email, formData.password);
      navigate("/"); // Redirect to homepage after registration
    } catch (error) {
      // Set the error message from the server or display a generic message
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 2 }}>
          How do you want to sign up?
        </Typography>

        <Box display="flex" justifyContent="center" mb={3}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <IconButton color="primary" sx={{ bgcolor: "#1877F2", color: "white" }}>
                <FaFacebookF />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" sx={{ bgcolor: "#EA4335", color: "white" }}>
                <FaGoogle />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" sx={{ bgcolor: "#1DA1F2", color: "white" }}>
                <FaTwitter />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton color="primary" sx={{ bgcolor: "#0077B5", color: "white" }}>
                <FaLinkedinIn />
              </IconButton>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="body2" align="center" color="textSecondary" sx={{ mb: 3 }}>
          Or continue with
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
        </Box>

        <Typography variant="body2" align="center" color="textSecondary" sx={{ mt: 2 }}>
          Have an account?{" "}
          <Link to="/login" style={{ color: "#f50057" }}>
            Log in
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
