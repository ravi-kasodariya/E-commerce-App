import React, { useState } from "react";
import { Box, Typography, TextField, Button, CardMedia,   IconButton,} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/system";
import { success } from "../utils/toast";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../utils/api";

const StyledButton = styled(Button)({
  backgroundColor: "#007bff",
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

const Support = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      if (!email || !message) {
        success("Please fill out all the fields.");
        return;
      }
      await api.post("/support", { email, message });
      success(
        "Your message has been sent to our support team! We'll get back to you shortly."
      );
      setMessage("");
      setEmail("");
    } catch (error) {
      console.error("Error sending message to support:", error);
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        borderRadius: "15px",
      }}
    >
    <Box sx={{ width: "100%", display: "flex" }}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "50%",
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Header Section */}
      <Typography
        variant="h3"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#007bff",
        }}
      >
        How Can We Help You?
      </Typography>
      <Typography
        variant="body1"
        sx={{ marginBottom: "30px", color: "#6c757d" }}
      >
        Whether you have questions about your order, need assistance with a
        product, or just want to share feedback, our support team is here for
        you!
      </Typography>

      {/* Visual or Banner */}
      <CardMedia
        component="img"
        alt="Customer Support"
        image="https://t4.ftcdn.net/jpg/00/79/50/59/360_F_79505915_SC9i2quT1ay3s2pp5lZaTCxWyBDUhdVz.jpg"
        sx={{
          width: "100%",
          height: "auto",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      />

      {/* Support Form */}
      <Typography
        variant="h5"
        sx={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Contact Us
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Your Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="How can we assist you?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      <StyledButton
        variant="contained"
        sx={{ padding: "10px 20px" }}
        onClick={handleSubmit}
      >
        Submit Request
      </StyledButton>

      {/* Additional Links and Information */}
      <Box
        sx={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #ddd",
          textAlign: "left",
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: "10px", fontWeight: "bold" }}
        >
          Quick Links
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
          <a href="" style={{ color: "#007bff", textDecoration: "none" }}>
            FAQs
          </a>{" "}
          - Find answers to common questions.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
          <a href="" style={{ color: "#007bff", textDecoration: "none" }}>
            Track My Order
          </a>{" "}
          - View the status of your recent orders.
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: "10px" }}>
          <a href="" style={{ color: "#007bff", textDecoration: "none" }}>
            Return Policy
          </a>{" "}
          - Learn how to return items.
        </Typography>
      </Box>

      {/* Call Customer Care Section */}
      <Box
        sx={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #ddd",
        }}
      >
        <Typography
          variant="h6"
          sx={{ marginBottom: "10px", fontWeight: "bold", textAlign: "center" }}
        >
          Call Customer Care
        </Typography>
        <Typography
          variant="body1"
          sx={{ marginBottom: "10px", textAlign: "center" }}
        >
          Our customer care team is available 24/7 to assist you. Give us a
          call!
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            textAlign: "center",
            color: "#007bff",
          }}
        >
          +44 90 9090 9090
        </Typography>
      </Box>
    </Box>
  );
};

export default Support;
