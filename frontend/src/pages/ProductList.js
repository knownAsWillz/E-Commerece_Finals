import React, { useEffect, useState, useContext } from "react";
import axiosClient from "../api/axiosClient";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductList() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [qtyMap, setQtyMap] = useState({});

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        if (category !== "all") params.category = category.toLowerCase();

        const res = await axiosClient.get("/products", { params });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
      }
    };
    loadProducts();
  }, [category, search]);

  const handleQtyChange = (id, value, maxStock) => {
    const num = Math.max(1, Math.min(Number(value) || 1, maxStock));
    setQtyMap(prev => ({ ...prev, [id]: num }));
  };

  const handleAdd = product => {
    const qty = qtyMap[product.id] || 1;
    addToCart(product, qty);
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Products</h2>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <form className="d-flex" style={{ maxWidth: 400 }} onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-success ms-2">Search</button>
        </form>

        <div className="btn-group">
          {["all", "Vegetable", "Fruit"].map(c => (
            <button
              key={c}
              className={"btn btn-sm " + (category.toLowerCase() === c.toLowerCase() ? "btn-success" : "btn-outline-success")}
              onClick={() => setCategory(c)}
            >
              {c === "all" ? "All" : c + "s"}
            </button>
          ))}
        </div>
      </div>

      <div className="row">
        {products.length ? (
          products.map(p => (
            <div key={p.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img src={p.image_url} className="card-img-top" alt={p.name} style={{ height: 180, objectFit: "cover" }} />
                <div className="card-body d-flex flex-column">
                  <h6 className="fw-semibold mb-1">{p.name}</h6>
                  <span className="badge bg-light text-muted mb-2">{p.category}</span>
                  <p className="text-success fw-bold mb-1">₱{p.price}</p>
                  <p className="text-muted small mb-2">Stock: {p.stock}</p>

                  <div className="d-flex align-items-center mb-2">
                    <input
                      type="number"
                      min="1"
                      max={p.stock}
                      className="form-control form-control-sm"
                      style={{ width: 70 }}
                      value={qtyMap[p.id] || 1}
                      onChange={e => handleQtyChange(p.id, e.target.value, p.stock)}
                    />
                    <button className="btn btn-sm btn-success ms-2" onClick={() => handleAdd(p)}>Add to cart</button>
                  </div>

                  <Link to={`/products/${p.id}`} className="mt-auto small text-decoration-none text-primary">View details →</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No products found.</p>
        )}
      </div>
    </div>
  );
}
