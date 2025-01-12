import React, { useEffect, useState } from "react";
import ProductCard, { ProductGrid } from "../components/ProductCard";
import api from "../utils/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const fetchProducts = async () => {
    try {
      const response = await api.get(
        `/products?userId=${currentUser?.id || ""}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return <ProductGrid products={products} />;
};

export default Product;
