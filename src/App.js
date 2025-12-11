import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import { CartProvider } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";

// Admin route guard
function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") return <Navigate to="/login" />;
  return children;
}

// User route guard
function UserRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "customer") return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User routes */}
          <Route
            path="/products"
            element={<UserRoute><ProductList /></UserRoute>}
          />
          <Route
            path="/products/:id"
            element={<UserRoute><ProductDetails /></UserRoute>}
          />
          <Route
            path="/cart"
            element={<UserRoute><Cart /></UserRoute>}
          />
          <Route
            path="/checkout"
            element={<UserRoute><Checkout /></UserRoute>}
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />
          <Route
            path="/admin/products"
            element={<AdminRoute><AdminProducts /></AdminRoute>}
          />
          <Route
            path="/admin/orders"
            element={<AdminRoute><AdminOrders /></AdminRoute>}
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
