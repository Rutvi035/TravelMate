import React, { useState, useEffect } from "react";
import axios from "axios";

function Alerts() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const [alerts, setAlerts] = useState([]);
  const [form, setForm] = useState({ destination: "", max_price: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Fetch all alerts for logged-in user (or all users if admin)
  const fetchAlerts = async () => {
    try {
      const url = isAdmin
        ? "http://localhost:5000/api/admin/alerts"
        : `http://localhost:5000/api/alerts/${user.id}`;
      const res = await axios.get(url);
      setAlerts(res.data);
    } catch (error) {
      console.error("Failed to fetch alerts");
    }
  };

  // Subscribe to alert
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/alerts", {
        ...form,
        user_id: user.id,
      });
      setIsError(false);
      setMessage("Alert created successfully!");
      setForm({ destination: "", max_price: "" });
      fetchAlerts();
    } catch (error) {
      setIsError(true);
      setMessage("Failed to create alert");
    }
  };

  // Delete alert
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/alerts/${id}`);
      setMessage("Alert deleted!");
      setIsError(false);
      fetchAlerts();
    } catch (error) {
      setIsError(true);
      setMessage("Failed to delete alert");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>🔔 {isAdmin ? "All User Alerts" : "Travel Alerts"}</h2>
        <p>
          {isAdmin
            ? "View price alerts created by all users"
            : "Subscribe to price alerts for your favourite destinations"}
        </p>
      </div>

      {/* Create Alert Form — hidden for admin */}
      {!isAdmin && (
        <div className="card fade-in">
          <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>
            Create New Alert
          </h3>
          {message && (
            <div
              className={`alert ${isError ? "alert-error" : "alert-success"}`}
            >
              {isError ? "⚠️" : "✅"} {message}
            </div>
          )}
          <form onSubmit={handleCreate}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  placeholder="e.g. Paris"
                  required
                  value={form.destination}
                  onChange={(e) =>
                    setForm({ ...form, destination: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Maximum Price (USD)</label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  required
                  value={form.max_price}
                  onChange={(e) =>
                    setForm({ ...form, max_price: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                padding: "14px",
              }}
            >
              Subscribe to Alert →
            </button>
          </form>
        </div>
      )}

      {/* Active Alerts */}
      <div className="page-header" style={{ marginTop: "10px" }}>
        <h2>
          {isAdmin
            ? `All Active Alerts (${alerts.length})`
            : `My Active Alerts (${alerts.length})`}
        </h2>
      </div>

      {alerts.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔕</div>
          <p style={{ color: "#8a8a8a" }}>
            {isAdmin
              ? "No alerts found."
              : "No alerts yet. Create one above to get notified of price drops!"}
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {alerts.map((alert, i) => (
            <div
              className="card-sm fade-in"
              key={alert._id}
              style={{
                animationDelay: `${i * 0.1}s`,
                position: "relative",
                borderTop: "3px solid #e8b84b",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "#8a8a8a",
                      marginBottom: "6px",
                    }}
                  >
                    Destination
                  </p>
                  <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                    📍 {alert.destination}
                  </h3>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "#0a1628",
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    ${alert.max_price}
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#8a8a8a",
                        fontWeight: "400",
                        fontFamily: "Arial",
                      }}
                    >
                      {" "}
                      max price
                    </span>
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "8px",
                      padding: "3px 10px",
                      background: "#d4edda",
                      color: "#155724",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    🟢 Active
                  </span>
                  {isAdmin && alert.user_id && (
                    <p style={{ marginTop: "10px", fontSize: "13px" }}>
                      <span
                        style={{
                          background: "#e8b84b",
                          color: "#0a1628",
                          borderRadius: "12px",
                          padding: "2px 10px",
                          fontWeight: "600",
                          marginRight: "8px",
                        }}
                      >
                        👤 {alert.user_id.username}
                      </span>
                      <span style={{ color: "#8a8a8a" }}>
                        {alert.user_id.email}
                      </span>
                    </p>
                  )}
                </div>
                {!isAdmin && (
                  <button
                    onClick={() => handleDelete(alert._id)}
                    style={{
                      background: "#fee2e2",
                      color: "#dc2626",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#8a8a8a",
                  marginTop: "12px",
                }}
              >
                Created: {new Date(alert.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alerts;
