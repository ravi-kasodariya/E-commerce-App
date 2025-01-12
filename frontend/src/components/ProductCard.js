import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearFromCart,
  removeFromCart,
} from "../features/products/productSlice";
import api from "../utils/api";
import { toast } from "react-toastify";
import { success } from "../utils/toast";

const ProductCard = ({
  id,
  title,
  image,
  price,
  description,
  detailedDescription,
  reviews = [],
  inCart,
}) => {
  const [openPreview, setOpenPreview] = useState(false);
  const [isInCart, setIsInCart] = useState(inCart);
  const rating = reviews.length
    ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
    : 0;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (inCart) {
    dispatch(addToCart());
  }
  const handleAddToCart = async () => {
    if (currentUser?.id) {
      dispatch(addToCart());
      await api.post(`/add-to-cart`, {
        productId: id,
        userId: currentUser.id,
        quantity: 1,
        status: "Cart",
      });
      setIsInCart(1);
      success(
        `Your ${title} has been added to the cart. Continue shopping or go to checkout to complete your order!`
      );
    } else {
      navigate("/login");
    }
  };

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const handleNavigateToDetail = () => {
    navigate(`/products/${id}`, {
      state: {
        id,
        title,
        image,
        price,
        description,
        detailedDescription,
        reviews,
      },
    });
  };

  return (
    <>
      <Card
        style={{
          maxWidth: 310,
          minWidth: 310,
          height: 450, // Set a fixed height for all cards
          margin: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "15px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth scaling and shadow transition
          marginTop: "20px",
        }}
        sx={{
          "&:hover": {
            transform: "scale(1.05)", // Slightly enlarge the card on hover
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Add a deeper shadow on hover
          },
        }}
      >
        <CardMedia
          component="img"
          alt={title}
          image={image}
          style={{
            width: "100%",
            height: "200px", // Fixed height for all images
            objectFit: "contain", // Crop the image without distortion
            cursor: "pointer",
            transition: "transform 0.3s ease", // Smooth scaling for the image
          }}
          onClick={handleOpenPreview}
          sx={{
            "&:hover": {
              transform: "scale(1.05)", // Slightly enlarge the image on hover
            },
          }}
        />
        <CardContent
          style={{
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#333",
              cursor: "pointer",
              "&:hover": { color: "#f39c12" },
            }}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            onClick={handleNavigateToDetail}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{
              marginBottom: "1rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              height: "60px",
            }}
          >
            {description}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", color: "#007bff" }}
            >
              £{price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{
                fontWeight: "bold",
              }}
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </Button>
          </Box>
          <Rating
            name="read-only"
            value={rating}
            readOnly
            style={{ marginTop: "1rem" }}
          />
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog
        open={openPreview}
        onClose={handleClosePreview}
        maxWidth="md"
        PaperProps={{
          style: {
            boxShadow: "none",
            backgroundColor: "transparent",
          },
        }}
      >
        <DialogTitle>
          <IconButton
            style={{ position: "absolute", top: 35, right: 3 }}
            onClick={handleClosePreview}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          style={{ padding: 0, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: "100%",
              height: "600px", // Fixed height for all images
              objectFit: "contain", // Crop the image without distortion
              backgroundColor: "white",
              borderRadius: "20px",
              padding: "20px",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

const ProductGrid = ({ products }) => {
  const dispatch = useDispatch();
  dispatch(clearFromCart());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default"); // Default sorting option

  // Function to handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Function to handle category filter
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to handle sorting
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Filter products based on search and category
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery);
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "highToLow") {
        return b.price - a.price; // High to Low
      } else if (sortOption === "lowToHigh") {
        return a.price - b.price; // Low to High
      }
      return 0; // Default sorting (no sorting)
    });

  // Get unique categories for the dropdown
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  return (
    <Box>
      {/* Search and Filter */}
      <Box
        display="flex"
        alignItems="flex-start"
        gap="40px"
        flexWrap="wrap"
        style={{ paddingTop: "30px", paddingLeft: "30px" }}
      >
        {/* Search Box with Label */}
        <Box display="flex" alignItems="center">
          <Typography style={{ marginRight: "10px", fontWeight: "bold" }}>
            Search:
          </Typography>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearch}
            style={{ minWidth: "500px" }}
          />
        </Box>

        {/* Category Dropdown with Label */}
        <Box display="flex" alignItems="center" gap="10px">
          <Typography style={{ marginRight: "10px", fontWeight: "bold" }}>
            Category:
          </Typography>
          <FormControl style={{ minWidth: "200px" }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Sorting Dropdown */}
        <Box display="flex" alignItems="center" gap="10px">
          <Typography style={{ marginRight: "10px", fontWeight: "bold" }}>
            Sort By:
          </Typography>
          <FormControl style={{ minWidth: "200px" }}>
            <InputLabel>Sort</InputLabel>
            <Select value={sortOption} onChange={handleSortChange} label="Sort">
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="highToLow">Price: High to Low</MenuItem>
              <MenuItem value="lowToHigh">Price: Low to High</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Filtered Products */}
      {filteredProducts.length > 0 ? (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap="20px"
          padding="20px"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </Box>
      ) : (
        <Typography
          variant="h6"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          No products found.
        </Typography>
      )}
    </Box>
  );
};

export { ProductCard, ProductGrid };
