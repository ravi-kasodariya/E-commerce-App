import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Product from "./pages/Product";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDetail from "./components/ProductDetail";
import OrderHistory from "./pages/OrderHistory";
import Cart from "./pages/Cart";
import SellerContact from "./pages/SellerContact";
import Support from "./pages/Support";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="products" element={<Product />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>

        {/* Protected Routes with Common Layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<OrderHistory />} />
            <Route path="support" element={<Support />} />
            <Route
              path="seller-contact/:sellerId"
              element={<SellerContact />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
