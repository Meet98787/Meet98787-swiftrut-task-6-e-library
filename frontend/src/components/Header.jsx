// src/components/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaPlus,
  FaBook,
  FaBookReader,
} from "react-icons/fa";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component={Link} to="/" sx={{ color: "inherit", textDecoration: "none" }}>
          E-Library App
        </Typography>

        {/* Navigation items */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          {user && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/"
                color="inherit"
                startIcon={<FaBook />}
              >
                All Books
              </Button>
              <Button
                component={Link}
                to="/add-book"
                color="inherit"
                startIcon={<FaPlus />}
              >
                Add E-book
              </Button>
              <Button
                component={Link}
                to="/my-books"
                color="inherit"
                startIcon={<FaBook />}
              >
                View My E-books
              </Button>
              <Button
                component={Link}
                to="/my-borrowed-books"
                color="inherit"
                startIcon={<FaBookReader />}
              >
                My Borrowed Books
              </Button>
            </Box>
          )}
        </Box>

        {/* User and Logout */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {!user ? (
            <>
              <Button
                component={Link}
                to="/login"
                color="inherit"
                startIcon={<FaSignInAlt />}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color="inherit"
                startIcon={<FaUserPlus />}
              >
                Register
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ color: "yellow", marginRight: 1 }}>
                Hello, {user.username}
              </Typography>
              <Button
                onClick={logout}
                color="inherit"
                startIcon={<FaSignOutAlt />}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
