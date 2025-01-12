import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  TextField,
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
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

const OrderHistory = () => {
  const [orderItems, setOrderItems] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    fetchOrderHistory();
  }, []);
  const fetchOrderHistory = async () => {
    try {
      const response = await api.get(
        `/get-cart-order/${currentUser.id}/Delivered`
      );
      setOrderItems(response.data.products);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const navigate = useNavigate();

  const handleAddReview = async (item) => {
    await api.post("/add-review", {
      review: item?.product?.review?.[0]?.review,
      rating: item?.product?.review?.[0]?.rating,
      productId: item.productId,
      userId: currentUser.id,
      orderId: item.id,
    });
    success(`Your review has been submitted!`);
    await fetchOrderHistory();
  };

  const handleEditReview = async (item) => {
    await api.put(`/edit-review/${item?.product?.review?.[0]?.id}`, {
      review: item?.product?.review?.[0]?.review,
      rating: item?.product?.review?.[0]?.rating,
      productId: item.productId,
      userId: currentUser.id,
      id: item?.product?.review?.[0]?.id,
      orderId: item.id,
    });
    success(`Your review has been submitted!`);
    await fetchOrderHistory();
  };

  const handleToggleReviewSection = (itemId) => {
    const updatedItems = orderItems.map((item) =>
      item.id === itemId
        ? { ...item, showReviewSection: !item.showReviewSection }
        : item
    );
    setOrderItems(updatedItems);
  };

  const handleRatingChange = (itemId, newRating) => {
    const updatedItems = orderItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            product: {
              ...item.product,
              review: [
                {
                  ...(item?.product?.review?.[0] || {}),
                  rating: newRating,
                  review: item?.product?.review?.[0]?.review,
                },
              ],
            },
          }
        : item
    );
    setOrderItems(updatedItems);
  };

  const handleReviewTextChange = (itemId, newText) => {
    const updatedItems = orderItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            product: {
              ...item.product,
              review: [
                {
                  ...(item?.product?.review?.[0] || {}),
                  review: newText,
                  rating: item?.product?.review?.[0]?.rating,
                },
              ],
            },
          }
        : item
    );
    setOrderItems(updatedItems);
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const navigateToSellerContact = (item) => {
    navigate(`/seller-contact/${item.product.seller.id}`);
  };

  if (orderItems.length === 0) {
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
          No Orders Yet{" "}
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
          You haven't placed any orders yet. Start shopping and we'll keep track
          of your orders here!
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
      {orderItems.map((item) => (
        <StyledCard key={item.id}>
          {/* Product Image */}
          <CardMedia
            component="img"
            alt={item.product.title}
            image={item.product.image}
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {/* Title and Average Rating */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  {item.product.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", color: "#007bff" }}
                >
                  Average Rating: {calculateAverageRating(item.product.reviews)}{" "}
                  / 5
                </Typography>
              </Box>

              {/* Price and Seller Info */}
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ color: "#007bff" }}>
                  £{item.product.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", fontStyle: "italic" }}
                >
                  Seller: {item.product.seller.name}
                </Typography>
              </Box>

              {/* Actions (Reorder and Contact Seller) */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  // marginTop: "10px",
                }}
              >
                {/* Add/Edit Review Button */}
                <Typography
                  sx={{
                    marginTop: "15px",
                    "&:hover": { color: "#f39c12" },
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => handleToggleReviewSection(item.id)}
                >
                  {item?.product?.review?.[0]?.id
                    ? "Edit Review"
                    : "Add Review"}
                </Typography>
                <StyledButton
                  variant="outlined"
                  onClick={() => navigateToSellerContact(item)}
                >
                  Contact Seller
                </StyledButton>
              </Box>

              {/* Review Section */}
              {item.showReviewSection && (
                <Box sx={{ marginTop: "20px" }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Your Review:
                  </Typography>
                  <Rating
                    name={`rating-${item.id}`}
                    value={item?.product?.review?.[0]?.rating || 0}
                    onChange={(e, newValue) =>
                      handleRatingChange(item.id, newValue)
                    }
                    sx={{ marginTop: "10px" }}
                  />
                  <TextField
                    label="Write a Review"
                    fullWidth
                    variant="outlined"
                    sx={{ marginTop: "10px" }}
                    multiline
                    rows={4}
                    value={item?.product?.review?.[0]?.review || ""}
                    onChange={(e) =>
                      handleReviewTextChange(item.id, e.target.value)
                    }
                  />
                  <StyledButton
                    variant="contained"
                    sx={{ marginTop: "10px" }}
                    onClick={() => {
                      if (item?.product?.review?.[0]?.id) {
                        handleEditReview(item); // Update review
                      } else {
                        handleAddReview(item); // Add review
                      }
                    }}
                  >
                    Submit Review
                  </StyledButton>
                </Box>
              )}
            </Box>
          </CardContent>
        </StyledCard>
      ))}
      <Box
        sx={{
          textAlign: "center",
          padding: "30px",
          marginTop: "30px",
          backgroundColor: "#f1f1f1",
          borderRadius: "15px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
          Need Help?
        </Typography>
        <Typography variant="body1" sx={{ color: "#555", marginTop: "10px" }}>
          If you have any questions or need assistance, feel free to reach out
          to our support team.
        </Typography>
        <StyledButton
          variant="contained"
          sx={{ marginTop: "20px", padding: "10px 20px" }}
          onClick={() => navigate("/support")} // Adjust to your support route
        >
          Contact Support
        </StyledButton>
      </Box>
    </Box>
  );
};

export default OrderHistory;
