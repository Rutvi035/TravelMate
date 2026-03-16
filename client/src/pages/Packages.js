import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Packages() {
  const { destination_id } = useParams();
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState("price");
  const [destName, setDestName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/packages/${destination_id}`,
        );
        setPackages(res.data);
      } catch (error) {
        console.error("Failed");
      }
    };
    fetchPackages();
  }, [destination_id]);

  const sorted = [...packages].sort((a, b) =>
    filter === "price" ? a.price - b.price : b.rating - a.rating,
  );

  const bestPrice = Math.min(...packages.map((p) => p.price));
  const bestRating = Math.max(...packages.map((p) => p.rating));

  return (
    <div className="container">
      <button
        className="btn btn-outline"
        onClick={() => navigate("/search")}
        style={{ marginBottom: "24px" }}
      >
        ← Back to Search
      </button>

      <div className="page-header">
        <h2>📦 Package Comparison</h2>
        <p>
          Compare all available packages and find the best deal for your trip
        </p>
      </div>

      {/* Summary Stats */}
      {packages.length > 0 && (
        <div
          className="stats-row fade-in"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          <div className="stat-card">
            <div className="stat-number">{packages.length}</div>
            <div className="stat-label">Packages Available</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">${bestPrice}</div>
            <div className="stat-label">Best Price</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">⭐{bestRating}</div>
            <div className="stat-label">Top Rating</div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="filter-bar fade-in">
        <label>Sort by:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="price">💰 Price (Low to High)</option>
          <option value="rating">⭐ Rating (High to Low)</option>
        </select>
      </div>

      {/* Package Cards */}
      {sorted.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
          <h3>No packages found</h3>
        </div>
      ) : (
        <div className="package-grid">
          {sorted.map((pkg, i) => (
            <div
              className={`package-card fade-in ${pkg.price === bestPrice ? "best-value" : ""}`}
              key={pkg._id}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {pkg.price === bestPrice && (
                <span
                  className="badge badge-green"
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    zIndex: 1,
                  }}
                >
                  Best Value
                </span>
              )}
              {pkg.rating === bestRating && (
                <span
                  className="badge badge-gold"
                  style={{
                    position: "absolute",
                    top: pkg.price === bestPrice ? "44px" : "16px",
                    right: "16px",
                    zIndex: 1,
                  }}
                >
                  Top Rated
                </span>
              )}

              <p className="provider">🏢 {pkg.provider}</p>
              <div className="price">
                ${pkg.price}
                <span> USD</span>
              </div>
              <div className="rating">
                {"⭐".repeat(Math.round(pkg.rating))} {pkg.rating}/5
              </div>

              <div className="details">
                <span>📅 {pkg.duration_days} days</span>
                <span>✅ {pkg.includes}</span>
              </div>

              <button
                className="btn btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                Select Package →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Packages;
