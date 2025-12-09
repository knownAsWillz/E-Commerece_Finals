import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [alertMsg, setAlertMsg] = useState(null);

  const handleAdd = () => {
    addToCart(product);
    setAlertMsg(`${product.name} added to cart!`);
    setTimeout(() => setAlertMsg(null), 2000);
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.image_url}
        className="card-img-top"
        alt={product.name}
        style={{ height: 200, objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted" style={{ flex: 1 }}>
          {product.description}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <strong>₱{product.price}</strong>
          <div>
            <Link
              to={`/products/${product.id}`}
              className="btn btn-sm btn-outline-success me-2"
            >
              Details
            </Link>
            <button className="btn btn-sm btn-success" onClick={handleAdd}>
              Add
            </button>
          </div>
        </div>
        {alertMsg && (
          <div className="alert alert-success text-center mt-2 py-1">
            {alertMsg}
          </div>
        )}
      </div>
    </div>
  );
}
