import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/signup", {
        email,
        password,
        firstName,
        lastName,
        phone,
      });
      const token = response.data.token;

      localStorage.setItem("authToken", token);

      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.errors?.[0]?.msg);
    }
  };

  return (
    <div style={styles.background}>
      <Container maxWidth="sm">
        <Paper elevation={4} style={styles.paper}>
          <Typography variant="h4" align="center" style={styles.title}>
            Sign up
          </Typography>
          {error && (
            <Alert style={{ marginBottom: "20px" }} severity="error">
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} style={styles.form}>
            <TextField
              label="First Name"
              type="text"
              variant="outlined"
              required
              fullWidth
              style={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              type="text"
              variant="outlined"
              required
              fullWidth
              style={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Phone Number"
              type="number"
              variant="outlined"
              required
              fullWidth
              style={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              required
              fullWidth
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              required
              fullWidth
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              style={styles.button}
              size="large"
              fullWidth
            >
              Sign Up
            </Button>
          </Box>
          <Typography variant="body2" align="center" style={styles.footerText}>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>
              Login
            </a>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

const styles = {
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(120deg, #edede9, #f7f9fc)",
    minHeight: "calc(100vh - 75px)",
    // backgroundImage: "url('/image/back.jpg')", // Background image
    // backgroundSize: "cover", // Ensures the image covers the entire container
    // backgroundPosition: "bottom", // Centers the image
  },
  backgroundColor: {},
  paper: {
    padding: "2rem",
    borderRadius: "10px",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    backgroundColor: "white",
    borderRadius: "10px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    fontWeight: "bold",
    borderRadius: "10px",
  },
  footerText: {
    marginTop: "1rem",
    color: "#555",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Signup;
