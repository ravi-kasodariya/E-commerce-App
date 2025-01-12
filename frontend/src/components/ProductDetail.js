import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Rating,
  TextField,
  Paper,
  Grid,
  IconButton,
  Badge,
  ToggleButtonGroup,
  ToggleButton,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/products/productSlice";
import { success } from "../utils/toast";
import MuiToggleButton from "@mui/material/ToggleButton";

const ProductDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [newReviewId, setNewReviewId] = useState(null);
  const [isInCart, setIsInCart] = useState(0);
  const [alignment, setAlignment] = useState("All");
  const dispatch = useDispatch();
  const fetchProduct = async () => {
    try {
      const response = await api.get(
        `/products/${id}?userId=${currentUser?.id}`
      );
      setProduct(response.data.product);
      setReviews(response.data.product.reviews);
      setIsInCart(response.data.product.inCart);
      const yReview = response.data.product.reviews.find(
        (r) => r.userId === currentUser?.id
      );
      setNewReview(yReview?.review);
      setNewRating(yReview?.rating);
      setNewReviewId(yReview?.id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleAddToCart = async () => {
    if (currentUser?.id) {
      dispatch(addToCart());
      await api.post(`/add-to-cart`, {
        productId: id,
        userId: currentUser.id,
        quantity: 1,
        status: "Cart",
      });
      success(
        `Your ${product.title} has been added to the cart. Continue shopping or go to checkout to complete your order!`
      );
      setIsInCart(1);
    } else {
      navigate("/login");
    }
  };

  const rating = reviews?.length
    ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews?.length
    : 0;

  const handleAddReview = async () => {
    if (newRating) {
      await api.post("/add-review", {
        review: newReview,
        rating: newRating,
        productId: id,
        userId: currentUser.id,
      });
      success(`Your review has been submitted!`);
      await fetchProduct();
    }
  };

  const handleEditReview = async () => {
    if (newRating) {
      await api.put(`/edit-review/${newReviewId}`, {
        review: newReview,
        rating: newRating,
        productId: id,
        userId: currentUser.id,
        id: newReviewId,
      });
      success(`Your review has been submitted!`);
      await fetchProduct();
    }
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
    const reviewsData = product?.reviews || [];
    setReviews(
      reviewsData?.filter((r) =>
        newAlignment === "Trusted" ? r.orderId : true
      )
    );
    console.log(product);
  };

  const ToggleButton = styled(MuiToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: "#008000",
    },
  });

  return (
    <Box sx={{ paddingTop: "10px" }}>
      {/* Back Button */}
      <Box sx={{ paddingLeft: "40px" }}>
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "40px",
          paddingTop: "30px",
        }}
      >
        {/* Left Side: Product Image */}
        <Box sx={{ flex: 1, mr: 4 }}>
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "white",
              padding: "10px",
            }}
          />
        </Box>

        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
            {product.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#007bff", fontWeight: "bold", marginBottom: 2 }}
          >
            £{product.price}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "textSecondary", marginBottom: 2 }}
          >
            {product.description}
          </Typography>

          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            <strong>Details:</strong> {product.detailedDescription}{" "}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{ fontWeight: "bold", padding: "10px 20px", marginBottom: 2 }}
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </Button>

          {/* Rating */}
          <Box sx={{ marginBottom: 2, display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Rating:
            </Typography>
            <Rating value={rating} readOnly />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          paddingX: "40px",
        }}
      >
        {/* Review Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "5px",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 1 }}>
            Reviews:
          </Typography>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            size="small"
          >
            <ToggleButton style={{ fontWeight: "bold" }} value="All">
              All
            </ToggleButton>
            <ToggleButton style={{ fontWeight: "bold" }} value="Trusted">
              Trusted
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        {/* Review List */}
        <Box sx={{ marginBottom: 2 }}>
          {reviews?.length === 0 ? (
            <Typography variant="body1">No reviews yet.</Typography>
          ) : (
            reviews?.map((review, index) => (
              <Paper
                key={index}
                sx={{ padding: 2, marginBottom: 2, boxShadow: 2 }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Typography style={{ fontWeight: "bold" }}>
                    {review.user.firstName + " " + review.user.lastName}
                  </Typography>
                  {review.orderId ? (
                    <Badge
                      color="primary"
                      badgeContent="Trusted"
                      sx={{
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        backgroundColor: "#4caf50", // Green color for trusted badge
                        color: "#fff",
                        marginLeft: "40px",
                      }}
                    />
                  ) : null}
                </Box>
                <Rating
                  value={review.rating}
                  readOnly
                  style={{ marginTop: "5px" }}
                />
                <Typography variant="body2">{review.review}</Typography>
              </Paper>
            ))
          )}
        </Box>

        {/* Add a Review Form */}
        {currentUser ? (
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Add a Review:
            </Typography>
            <TextField
              label="Your review"
              fullWidth
              multiline
              rows={4}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              sx={{ marginBottom: 2 }}
              style={{ marginTop: "10px" }}
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rating
                value={newRating}
                onChange={(event, newValue) => setNewRating(newValue)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={newReviewId ? handleEditReview : handleAddReview}
                sx={{ fontWeight: "bold", marginLeft: "20px" }}
              >
                Submit Review
              </Button>
            </div>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default ProductDetail;

