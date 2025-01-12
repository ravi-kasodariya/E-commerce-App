import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Modal,
  TextField,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { removeFromCart, setToCart } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { success } from "../utils/toast";

const StyledCard = styled(Card)({
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  borderRadius: "15px",
  padding: "15px",
  backgroundColor: "#f8f9fa",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#007bff",
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  useEffect(() => {
    fetchCartProduct();
  }, []);

  const fetchCartProduct = async () => {
    try {
      const response = await api.get(`/get-cart-order/${currentUser.id}/Cart`);
      setCartItems(response.data.products);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const buyNow = (id) => {
    setSelectedProducts([id]);
    setIsModalOpen(true);
  };

  const handleRemoveFromCart = async (id) => {
    await api.delete(`/remove-cart/${id}`);
    success("Item removed from cart!");
    dispatch(removeFromCart());
    await fetchCartProduct();
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPayment = async () => {
    await api.put(`/edit-cart`, {
      orderIds: selectedProducts,
      status: "Delivered",
    });
    success("Your order has been placed successfully!");
    dispatch(setToCart(cartItems.length - selectedProducts.length));
    setSelectedProducts([]);
    setIsModalOpen(false);
    fetchCartProduct();
  };

  const selectedItems = cartItems.filter((item) =>
    selectedProducts.includes(item.id)
  );

  if (cartItems.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          padding: "40px",
          textAlign: "center",
          height: "80vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#007bff",
            marginBottom: "20px",
          }}
        >
          Oops! Your Cart is Empty{" "}
          <span role="img" aria-label="sad face">
            😞
          </span>
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#6c757d",
            marginBottom: "20px",
          }}
        >
          It seems you haven't added any products to your cart yet. Explore our
          items and start shopping!
        </Typography>

        <StyledButton
          variant="contained"
          color="primary"
          sx={{
            padding: "10px 20px",
          }}
          onClick={() => navigate("/products")} // Add routing logic to products page
        >
          Browse Products
        </StyledButton>
      </Box>
    );
  }

  return (
    <Box padding="20px" sx={{ paddingX: "100px" }}>
      {cartItems.map((item) => (
        <StyledCard key={item.id}>
          {/* Checkbox for Selection */}
          <Checkbox
            checked={selectedProducts.includes(item.id)}
            onChange={() => handleToggleSelect(item.id)}
            sx={{ color: "#007bff", "&.Mui-checked": { color: "#0056b3" } }}
          />

          {/* Product Image */}
          <CardMedia
            component="img"
            alt={item.product?.title}
            image={item.product?.image}
            sx={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "10px",
              marginRight: "20px",
            }}
          />

          {/* Product Details */}
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
              {item.product?.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ margin: "10px 0", color: "#555" }}
            >
              {item.product?.description}
            </Typography>
            <Typography variant="h6" sx={{ color: "#007bff" }}>
              £{item.product?.price}
            </Typography>
          </CardContent>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <StyledButton
              onClick={() => buyNow(item.id)}
              variant="contained"
              sx={{ marginBottom: "10px" }}
            >
              Buy Now
            </StyledButton>
            <IconButton
              sx={{
                color: "#dc3545",
                "&:hover": { backgroundColor: "#f8d7da", color: "#a71d2a" },
              }}
              onClick={() => handleRemoveFromCart(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </StyledCard>
      ))}

      {/* Checkout Button */}
      <Box
        display="flex"
        justifyContent="flex-end"
        marginTop="20px"
        paddingRight="20px"
      >
        <StyledButton
          variant="contained"
          onClick={handleCheckout}
          disabled={selectedProducts.length === 0}
        >
          Checkout ({selectedProducts.length} items)
        </StyledButton>
      </Box>

      {/* Payment Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", md: "50%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "15px",
            outline: "none",
          }}
        >
          {/* Modal Header */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "20px",
              color: "#007bff",
            }}
          >
            Checkout
          </Typography>

          {/* Order Summary Section */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: "#333",
              borderBottom: "1px solid #ddd",
              paddingBottom: "5px",
            }}
          >
            Order Summary
          </Typography>
          <Box sx={{ maxHeight: "200px", overflowY: "auto" }}>
            {selectedItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {item.product.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#007bff" }}
                >
                  £{item.product?.price}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: "right",
              marginTop: "10px",
              fontWeight: "bold",
              color: "#28a745",
            }}
          >
            Total: $
            {selectedItems
              .reduce((total, item) => total + item.product?.price, 0)
              .toFixed(2)}
          </Typography>

          {/* Payment Details Section */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginTop: "20px",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Payment Details
          </Typography>

          {/* Form Fields */}
          <Box sx={{ marginBottom: "10px" }}>
            <TextField
              label="Credit Card Number"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <TextField
              label="Expiry Date"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
            <TextField
              label="CVV"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <TextField
              label="Billing Address"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: "10px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#007bff",
              "&:hover": {
                backgroundColor: "#0056b3",
              },
            }}
            onClick={handleSubmitPayment}
          >
            Submit Payment
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CartPage;
