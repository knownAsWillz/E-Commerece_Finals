import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axiosClient.post("/register", form);
      login(res.data);
      navigate("/products");
    } catch {
      setError("Registration failed. Email may be taken.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card container">
        <div className="row">

          <div className="col-md-6 d-none d-md-flex flex-column justify-content-center p-4">
            <h2 className="fw-bold text-success mb-3">Join FreshMart</h2>
            <p className="text-muted">
              Create an account to order fresh produce and get fast delivery.
            </p>
          </div>

          <div className="col-md-6 p-4 bg-white rounded-end">
            <h3 className="fw-bold mb-3">Register</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input name="name" className="form-control"
                  value={form.name} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="email" type="email" className="form-control"
                  value={form.email} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input name="password" type="password" className="form-control"
                  value={form.password} onChange={handleChange} required />
              </div>

              <button className="btn btn-success w-100">Register</button>
            </form>

            <p className="mt-3 text-muted small">
              Already have an account? <Link to="/login">Login here.</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
