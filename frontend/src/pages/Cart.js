import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { items, removeFromCart, updateQty, clearCart, total } =
    useContext(CartContext);

  if (!items.length) {
    return (
      <div className="container mt-4">
        <h2>Cart</h2>
        <div className="alert alert-info">
          Your cart is empty. <Link to="/products">Browse products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Your Cart</h2>

      {items.map((i) => (
        <div
          key={i.id}
          className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
        >
          <div className="d-flex align-items-center">
            <img
              src={i.image_url}
              alt={i.name}
              style={{ width: 64, height: 64, objectFit: "cover" }}
              className="rounded me-3"
            />
            <div>
              <div className="fw-semibold">{i.name}</div>
              <div className="text-muted small">₱{i.price}</div>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <input
              type="number"
              min="1"
              max={i.stock}
              value={i.qty}
              onChange={(e) => updateQty(i.id, Number(e.target.value))}
              className="form-control form-control-sm me-2"
              style={{ width: 80 }}
            />
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeFromCart(i.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4>Total: ₱{total.toFixed(2)}</h4>

        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={clearCart}
          >
            Clear
          </button>
          <Link to="/checkout" className="btn btn-success">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
