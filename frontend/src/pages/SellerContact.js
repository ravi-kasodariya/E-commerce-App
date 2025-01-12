import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../utils/api";

const ChatContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "calc(100vh - 140px)",
  margin: "auto",
  backgroundColor: "#f4f6f9",
});

const ChatHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "15px",
  backgroundColor: "#007bff",
  color: "#fff",
  // borderRadius: "15px 15px 0 0",
});

const MessageList = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const MessageBubble = styled(Paper)(({ isUser }) => ({
  padding: "10px 15px",
  borderRadius: "15px",
  alignSelf: isUser ? "flex-end" : "flex-start",
  backgroundColor: isUser ? "#007bff" : "#f1f1f1",
  color: isUser ? "#fff" : "#000",
  maxWidth: "70%",
}));

const ChatFooter = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: "15px",
  borderTop: "1px solid #ddd",
  backgroundColor: "#f4f6f9",
  borderRadius: "0 0 15px 15px",
});

const SellerContact = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you?", isUser: false },
    { id: 2, text: "I have a question about my order.", isUser: true },
  ]);

  const [seller, setSeller] = useState(null);

  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    getSeller();
  }, []);
  const getSeller = async () => {
    try {
      const response = await api.get(`/get-seller/${sellerId}`);
      setSeller(response.data.seller);
    } catch (error) {
      console.error("Error fetching seller:", error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), text: newMessage, isUser: true },
      ]);
      setNewMessage(""); // Clear input after sending
    }
  };

  return (
    <ChatContainer>
      {/* Chat Header */}
      <ChatHeader>
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
        <Avatar
          sx={{
            marginX: "10px",
            backgroundColor: "#fff",
            color: "#007bff",
          }}
        >
          {seller?.name?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography variant="h6">Chat with {seller?.name}</Typography>
      </ChatHeader>

      {/* Message List */}
      <MessageList>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} isUser={msg.isUser}>
            {msg.text}
          </MessageBubble>
        ))}
      </MessageList>

      {/* Chat Footer */}
      <ChatFooter>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ marginRight: "10px", backgroundColor: "#fff" }}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <SendIcon />
        </IconButton>
      </ChatFooter>
    </ChatContainer>
  );
};

export default SellerContact;
