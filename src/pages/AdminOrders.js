import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    axiosClient.get("/admin/orders").then((res) => setOrders(res.data));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id, status) => {
    await axiosClient.put(`/admin/orders/${id}/status`, { status });
    loadOrders();
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Admin – Orders</h2>

      <div className="card p-3">

        <table className="table table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th style={{ width: 150 }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>

                <td>
                  {o.customer_name}
                  <br />
                  <small className="text-muted">{o.customer_contact}</small>
                </td>

                <td>
                  {o.items.map((it) => (
                    <div key={it.id} className="small">
                      {it.product?.name} × {it.quantity}
                    </div>
                  ))}
                </td>

                <td>₱{Number(o.total_amount).toFixed(2)}</td>

                <td className="text-capitalize">{o.status}</td>

                <td>{new Date(o.created_at).toLocaleString()}</td>

                <td>
                  <select
                    className="form-select form-select-sm"
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(o.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}

            {!orders.length && (
              <tr>
                <td colSpan="7" className="text-muted">
                  No orders yet.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
