import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image_url: "",
  });
  const [error, setError] = useState("");
  const [toast, setToast] = useState(""); // Toast message

  const loadProducts = () => {
    axiosClient.get("/admin/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load products:", err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Function to show a toast message
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000); // Auto-hide after 3s
  };

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const resetForm = () => {
    setForm({ id: null, name: "", category: "", price: "", stock: "", description: "", image_url: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        description: form.description,
        image_url: form.image_url,
      };

      if (form.id) {
        await axiosClient.put(`/admin/products/${form.id}`, payload);
        showToast("Product updated successfully!");
      } else {
        await axiosClient.post("/admin/products", payload);
        showToast("Product added successfully!");
      }

      resetForm();
      loadProducts();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to save product.");
    }
  };

  const handleEdit = (p) => {
    setForm({ ...p });
    setError("");
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await axiosClient.delete(`/admin/products/${id}`);
      showToast("Product deleted successfully!");
      loadProducts();
    } catch (err) {
      if (err.response?.status === 400) {
        alert(err.response.data.error);
      } else {
        alert("Failed to delete product.");
        console.error(err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Admin – Products</h2>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed",
          top: 20,
          right: 20,
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          zIndex: 9999,
        }}>
          {toast}
        </div>
      )}

      {/* Form */}
      <div className="card p-3 mb-4">
        <h5>{form.id ? "Edit Product" : "Add Product"}</h5>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-4">
            <label>Name</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} required />
          </div>

          <div className="col-md-4">
            <label>Category</label>
            <input name="category" className="form-control" value={form.category} onChange={handleChange} placeholder="Fruit / Vegetable" required />
          </div>

          <div className="col-md-2">
            <label>Price</label>
            <input name="price" type="number" className="form-control" value={form.price} onChange={handleChange} required />
          </div>

          <div className="col-md-2">
            <label>Stock</label>
            <input name="stock" type="number" className="form-control" value={form.stock} onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label>Image URL</label>
            <input name="image_url" className="form-control" value={form.image_url} onChange={handleChange} placeholder="https://..." required />
          </div>

          <div className="col-12">
            <label>Description</label>
            <textarea name="description" className="form-control" value={form.description} onChange={handleChange} />
          </div>

          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-success me-2" type="submit">{form.id ? "Update" : "Add"}</button>
            {form.id && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="card p-3">
        <h5>Product List</h5>
        <table className="table table-striped table-sm mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Cart.</th>
              <th>Price</th>
              <th>Stock</th>
              <th style={{ width: 140 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length ? products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>₱{p.price}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="5" className="text-muted">No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
