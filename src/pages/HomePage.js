import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-hero" style={{ minHeight: "80vh" }}>
    <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5">

      <div className="mb-4 mb-md-0" style={{ maxWidth: 520 }}>
        <h1 className="display-4 fw-bold text-success">FreshMart</h1>
        <p className="lead text-muted">
          FreshMart is your online marketplace for fresh fruits and vegetables.
          Healthy, affordable, and delivered same-day.
        </p>

        <ul className="list-unstyled text-muted small">
          <li>• Same-day delivery</li>
          <li>• Handpicked produce</li>
          <li>• Affordable and sustainable</li>
        </ul>

        <div className="mt-3">
          <Link to="/login" className="btn btn-success me-2">
            Start Shopping
          </Link>
          <Link to="/register" className="btn btn-outline-success">
            Create an Account
          </Link>
        </div>
      </div>

      <div className="text-center">
        <img
          src="https://i.pinimg.com/736x/53/a7/7c/53a77c61f6da8c85075205eba25df83c.jpg"
          alt="Fresh produce"
          className="img-fluid rounded shadow"
          style={{
            maxWidth: "500px",
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
        />
      </div>

    </div>
  </div>

  );
}
