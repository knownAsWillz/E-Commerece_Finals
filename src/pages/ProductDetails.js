import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import axiosClient from "../api/axiosClient";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [prod, setProd] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axiosClient.get(`/products/${id}`)
      .then((res) => setProd(res.data))
      .catch(() => setProd(null));
  }, [id]);

  if (!prod) return <div className="container mt-4">Product not found.</div>;

  const handleAdd = () => addToCart(prod, qty);

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow-sm border-0">
        <div className="row">

          <div className="col-md-5">
            <img src={prod.image_url} alt={prod.name} className="img-fluid rounded" />
          </div>

          <div className="col-md-7">
            <h3 className="fw-bold">{prod.name}</h3>
            <p className="text-muted">{prod.description}</p>
            <p className="text-success fw-bold fs-4">₱{prod.price}</p>
            <p className="text-muted">Stock: {prod.stock}</p>

            <div className="d-flex align-items-center mb-3">
              <label className="me-2">Qty:</label>
              <input
                type="number"
                min="1"
                max={prod.stock}
                value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(prod.stock, e.target.value)))}
                className="form-control"
                style={{ width: 100 }}
              />
            </div>

            <button className="btn btn-success me-2" onClick={handleAdd}>
              Add to cart
            </button>

            <Link to="/products" className="btn btn-outline-secondary">
              Back
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
