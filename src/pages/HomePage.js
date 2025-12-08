import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="home-hero">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5">

        <div className="mb-4 mb-md-0" style={{ maxWidth: 520 }}>
          <h1 className="display-5 fw-bold text-success">FreshMart</h1>
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

        <div>
          <img
            src="https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=60"
            alt="Fresh produce"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
}
