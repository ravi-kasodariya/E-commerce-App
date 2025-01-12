import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Box, Breadcrumbs, CssBaseline, Toolbar } from "@mui/material";
import "./Layout.css";
import { useDispatch } from "react-redux";
import { removeToken } from "../features/auth/authSlice";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [key, setKey] = useState(0);
  const handleLogout = (setAnchorEl) => {
    setAnchorEl(null);
    localStorage.clear();
    dispatch(removeToken());
    navigate("/products");
    setKey((prevKey) => prevKey + 1);
  };
  return (
    <Box className="layout">
      <CssBaseline />
      <Toolbar
        style={{
          padding: "0px",
          position: "fixed",
          width: "100%",
          zIndex: "999",
        }}
      >
        <Header onLogout={handleLogout} />
      </Toolbar>

      <main
        className="content"
        style={{
          marginTop: "75px",
          padding: "0px",
          backgroundColor: "#f4f6f9",
        }}
      >
        <Breadcrumbs icon title rightAlign />
        <Outlet key={key} />
      </main>
      <Toolbar>
        <Footer />
      </Toolbar>
      <ToastContainer />
    </Box>
  );
};

export default Layout;
