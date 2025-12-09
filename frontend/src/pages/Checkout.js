import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axiosClient from "../api/axiosClient";

export default function Checkout() {
  const { items, total, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({
    customer_name: "",
    address: "",
    contact: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  if (!items.length) {
    return (
      <div className="container mt-4">
        <h2>Checkout</h2>
        <div className="alert alert-info">Your cart is empty.</div>
      </div>
    );
  }

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (!form.customer_name || !form.address || !form.contact) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await axiosClient.post("/orders", {
        customer_name: form.customer_name,
        address: form.address,
        contact: form.contact,
        items: items.map((i) => ({
          product_id: i.id,
          quantity: i.qty,
        })),
      });

      clearCart();
      setMsg("Order placed successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Checkout</h2>
      <div className="row">
        {/* Order Summary */}
        <div className="col-md-5 mb-3">
          <div className="card p-3">
            <h5>Order Summary</h5>
            <ul className="list-group list-group-flush">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{i.name} × {i.qty}</span>
                  <span>₱{(i.price * i.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h5 className="mt-3">Total: ₱{total.toFixed(2)}</h5>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="col-md-7">
          <div className="card p-3">
            <h5>Customer Information</h5>
            {msg && <div className="alert alert-success">{msg}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  name="customer_name"
                  className="form-control"
                  value={form.customer_name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  name="address"
                  className="form-control"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contact Info</label>
                <input
                  name="contact"
                  className="form-control"
                  value={form.contact}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn-success w-100">Place Order</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
