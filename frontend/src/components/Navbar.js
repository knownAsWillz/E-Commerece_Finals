import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import axiosClient from "../api/axiosClient";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { items } = useContext(CartContext); // get cart items
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosClient.post("/logout");
    } catch (e) {
      console.error(e);
    }
    logout();
    navigate("/");
  };

  // total items in cart
  const cartCount = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={{ background: "white" }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: "#2E7D32" }}>
          FreshMart
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav me-auto">
            {user ? (
              user.role?.toLowerCase() === "customer" ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/products" className="nav-link">Shop</NavLink>
                  </li>
                  <li className="nav-item position-relative">
                    <NavLink to="/cart" className="nav-link d-flex align-items-center">
                      🛒 Cart
                      {cartCount > 0 && (
                        <span className="badge bg-success ms-1" style={{ fontSize: "0.75rem" }}>
                          {cartCount}
                        </span>
                      )}
                    </NavLink>
                  </li>
                </>
              ) : user.role?.toLowerCase() === "admin" ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/admin/dashboard" className="nav-link">Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/products" className="nav-link">Products</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/admin/orders" className="nav-link">Orders</NavLink>
                  </li>
                </>
              ) : null
            ) : null}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!user && (
              <li className="nav-item">
                <NavLink className="btn btn-outline-success" to="/login">Log in</NavLink>
              </li>
            )}

            {user && (
              <>
                <li className="nav-item me-2 d-flex align-items-center text-muted">
                  {user.role?.toLowerCase() === "admin" ? "Admin" : "User"}: {user.name}
                </li>

                <li className="nav-item">
                  <button className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
