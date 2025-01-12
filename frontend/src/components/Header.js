import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Paper,
  Badge,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api";
import { setToCart } from "../features/products/productSlice";

const Header = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const cartItemCount = useSelector((state) => state.products.cartItemCount);
  const token = useSelector((state) => state.auth.token);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (currentUser) {
      fetchCartProduct();
    }
  }, []);
  const fetchCartProduct = async () => {
    try {
      const response = await api.get(`/get-cart-order/${currentUser.id}/Cart`);
      dispatch(setToCart(response.data.products.length));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <>
      <Paper
        sx={{
          background: "linear-gradient(90deg, #1e3c72, #2a5298)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "0px",
          borderRadius: "0px",
        }}
      >
        <Box component="span" style={{ display: "flex", paddingLeft: "20px" }}>
          <Link to="/products">
            <img
              style={{ width: "75px", height: "auto", cursor: "pointer" }}
              src="/image/logo.png"
              alt="Logo"
            />
          </Link>
        </Box>

        {token ? (
          <Box
            display="flex"
            alignItems="center"
            style={{ paddingRight: "20px" }}
          >
            {/* Cart Icon */}
            <Link to="/cart">
              <IconButton
                sx={{
                  color: "#fff",
                  marginRight: "20px",
                  "&:hover": { color: "#f39c12" },
                }}
              >
                <Badge
                  badgeContent={cartItemCount}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      top: "5%",
                      right: "5%",
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            <Link to="/orders">
              <IconButton
                sx={{
                  color: "#fff",
                  marginRight: "20px",
                  "&:hover": { color: "#f39c12" },
                }}
              >
                <HistoryIcon />
              </IconButton>
            </Link>

            <Avatar
              alt="Profile"
              src="https://www.w3schools.com/howto/img_avatar.png"
              sx={{
                width: 40,
                height: 40,
                cursor: "pointer",
                border: "2px solid #fff",
                "&:hover": { borderColor: "#f39c12" },
              }}
              onClick={handleProfileClick}
            />

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                ".MuiPaper-root": {
                  borderRadius: "8px",
                  padding: "4px",
                },
              }}
            >
              <MenuItem
                onClick={() => onLogout(setAnchorEl)}
                sx={{ padding: "10px" }}
              >
                <LogoutIcon sx={{ marginRight: "8px" }} />
                <Typography>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box
            display="flex"
            alignItems="center"
            style={{ paddingRight: "20px" }}
          >
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "#fff",
                  marginRight: "20px",
                  "&:hover": { color: "#f39c12" },
                  fontWeight: "bold",
                }}
              >
                Login
              </Typography>
            </Link>

            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  color: "#fff",
                  marginRight: "20px",
                  "&:hover": { color: "#f39c12" },
                  fontWeight: "bold",
                }}
              >
                SignUp
              </Typography>
            </Link>
          </Box>
        )}
      </Paper>
    </>
  );
};

export default Header;
