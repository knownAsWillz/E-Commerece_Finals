import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_revenue: 0,
    total_products: 0,
    total_orders: 0,
    recent_orders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axiosClient.get("/admin/dashboard");

        // Example API response structure expected:
        // {
        //   total_revenue: 1234.56,
        //   total_products: 12,
        //   total_orders: 34,
        //   recent_orders: [ {id, customer_name, total_amount, status, created_at} ]
        // }

        setStats({
          total_revenue: res.data.total_revenue ?? 0,
          total_products: res.data.total_products ?? 0,
          total_orders: res.data.total_orders ?? 0,
          recent_orders: Array.isArray(res.data.recent_orders)
            ? res.data.recent_orders
            : [],
        });
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="container mt-4">Loading dashboard...</div>;
  if (error) return <div className="container mt-4 text-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Admin Dashboard</h2>

      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center">
            <small className="text-muted">Total Revenue</small>
            <h4>₱{Number(stats.total_revenue).toFixed(2)}</h4>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center">
            <small className="text-muted">Total Products</small>
            <h4>{stats.total_products}</h4>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center">
            <small className="text-muted">Total Orders</small>
            <h4>{stats.total_orders}</h4>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card p-3 text-center">
            <small className="text-muted">Recent Orders</small>
            <h4>{stats.recent_orders.length}</h4>
          </div>
        </div>
      </div>

      <h5>Recent Orders</h5>
      <div className="card p-3">
        <table className="table table-sm mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {stats.recent_orders.length > 0 ? (
              stats.recent_orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>₱{Number(order.total_amount).toFixed(2)}</td>
                  <td className="text-capitalize">{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted text-center">
                  No recent orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
