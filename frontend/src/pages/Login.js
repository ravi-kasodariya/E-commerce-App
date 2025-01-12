import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setToken } from "../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", { email, password });
      const token = response.data.token;
      dispatch(setToken(token));
      localStorage.setItem("authToken", token);
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      navigate("/products");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div style={styles.background}>
      <Container maxWidth="sm">
        <Paper elevation={4} style={styles.paper}>
          <Typography variant="h4" align="center" style={styles.title}>
            Login
          </Typography>
          {error && (
            <Alert style={{ marginBottom: "20px" }} severity="error">
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleLogin} style={styles.form}>
            <TextField
              label="Email Address"
              type="email"
              variant="outlined"
              fullWidth
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="body2"
              align="right"
              style={{ marginTop: "-10px", marginBottom: "10px" }}
            >
              <a href="" style={styles.link}>
                Forgot Password?
              </a>
            </Typography>
            <Button
              type="submit"
              variant="contained"
              style={styles.button}
              size="large"
              fullWidth
            >
              Login
            </Button>
          </Box>
          <Typography variant="body2" align="center" style={styles.footerText}>
            Don't have an account?{" "}
            <a href="/signup" style={styles.link}>
              Sign up
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
  },
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

export default Login;
