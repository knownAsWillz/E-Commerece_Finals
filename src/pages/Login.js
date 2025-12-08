import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosClient.post("/login", form);

      if (!res.data?.user || !res.data?.token) {
        setError("Login failed. Invalid response from server.");
        return;
      }

      login(res.data);

      // Redirect based on role
      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/products");
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card container">
        <div className="row">
          <div className="col-md-6 d-none d-md-flex flex-column justify-content-center p-4">
            <h2 className="fw-bold text-success mb-3">Welcome to FreshMart</h2>
            <p className="text-muted">
              Log in to continue shopping our fresh produce and manage your orders.
            </p>
          </div>

          <div className="col-md-6 p-4 bg-white rounded-end">
            <h3 className="fw-bold mb-3">Log in</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-success w-100" type="submit">
                Log in
              </button>
            </form>

            <p className="mt-3 text-muted small">
              Don’t have an account? <Link to="/register">Register here.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
