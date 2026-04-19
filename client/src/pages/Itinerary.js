import React, { useState, useEffect } from "react";
import axios from "axios";

function Itinerary() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [itineraries, setItineraries] = useState([]);
  const [form, setForm] = useState({
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
  });
  const [itemForm, setItemForm] = useState({
    time: "",
    activity: "",
    notes: "",
  });
  const [selectedId, setSelectedId] = useState(null);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchItineraries();
  }, []);

  // Fetch all itineraries for logged-in user
  const fetchItineraries = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/itinerary/${user.id}`,
      );
      setItineraries(res.data);
    } catch (error) {
      console.error("Failed to fetch");
    }
  };

  // Create new itinerary
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/itinerary", {
        ...form,
        user_id: user.id,
      });
      setIsError(false);
      setMessage("Itinerary created successfully!");
      setForm({ title: "", destination: "", start_date: "", end_date: "" });
      fetchItineraries();
    } catch (error) {
      setIsError(true);
      setMessage("Failed to create itinerary");
    }
  };

  // Add item to itinerary
  const handleAddItem = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/itinerary/${id}/items`,
        itemForm,
      );
      setMessage("Item added!");
      setIsError(false);
      setItemForm({ time: "", activity: "", notes: "" });
      fetchItineraries();
    } catch (error) {
      setIsError(true);
      setMessage("Failed to add item");
    }
  };

  // Delete itinerary
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/itinerary/${id}`);
      setMessage("Itinerary deleted!");
      setIsError(false);
      fetchItineraries();
    } catch (error) {
      setIsError(true);
      setMessage("Failed to delete");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>🗓️ My Itineraries</h2>
        <p>Plan your trip schedule day by day</p>
      </div>

      {/* Create Itinerary Form */}
      <div className="card fade-in">
        <h3 style={{ marginBottom: "20px", fontSize: "20px" }}>
          Create New Itinerary
        </h3>
        {message && (
          <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>
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
              <label>Itinerary Title</label>
              <input
                type="text"
                placeholder="e.g. Paris Honeymoon Trip"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
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
              <label>Start Date</label>
              <input
                type="date"
                required
                value={form.start_date}
                onChange={(e) =>
                  setForm({ ...form, start_date: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                required
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "14px" }}
          >
            Create Itinerary →
          </button>
        </form>
      </div>

      {/* Itinerary List */}
      {itineraries.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "40px" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>📭</div>
          <p style={{ color: "#8a8a8a" }}>
            No itineraries yet. Create your first one above!
          </p>
        </div>
      ) : (
        itineraries.map((itin) => (
          <div className="card fade-in" key={itin._id}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "20px", marginBottom: "6px" }}>
                  {itin.title}
                </h3>
                <p style={{ color: "#8a8a8a", fontSize: "14px" }}>
                  📍 {itin.destination} &nbsp;|&nbsp; 📅 {itin.start_date} →{" "}
                  {itin.end_date}
                </p>
              </div>
              <button
                className="btn"
                onClick={() => handleDelete(itin._id)}
                style={{
                  background: "#fee2e2",
                  color: "#dc2626",
                  padding: "8px 16px",
                  fontSize: "13px",
                }}
              >
                Delete
              </button>
            </div>

            {/* Schedule Items */}
            {itin.items.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <h4
                  style={{
                    fontSize: "14px",
                    color: "#8a8a8a",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Schedule
                </h4>
                {itin.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "10px",
                      background: "#f8f4ee",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        color: "#e8b84b",
                        minWidth: "60px",
                        fontSize: "13px",
                      }}
                    >
                      {item.time}
                    </span>
                    <span style={{ fontWeight: "600", fontSize: "13px" }}>
                      {item.activity}
                    </span>
                    {item.notes && (
                      <span style={{ color: "#8a8a8a", fontSize: "13px" }}>
                        — {item.notes}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Add Item Form */}
            {selectedId === itin._id ? (
              <div
                style={{
                  background: "#f8f4ee",
                  padding: "16px",
                  borderRadius: "10px",
                }}
              >
                <h4 style={{ marginBottom: "12px", fontSize: "14px" }}>
                  Add Schedule Item
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Time (e.g. 9:00 AM)"
                    value={itemForm.time}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, time: e.target.value })
                    }
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "13px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Activity"
                    value={itemForm.activity}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, activity: e.target.value })
                    }
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "13px",
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Notes (optional)"
                    value={itemForm.notes}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, notes: e.target.value })
                    }
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      fontSize: "13px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="btn btn-primary"
                    style={{ padding: "8px 16px", fontSize: "13px" }}
                    onClick={() => handleAddItem(itin._id)}
                  >
                    Add Item
                  </button>
                  <button
                    className="btn btn-outline"
                    style={{ padding: "8px 16px", fontSize: "13px" }}
                    onClick={() => setSelectedId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="btn btn-dark"
                style={{ padding: "8px 18px", fontSize: "13px" }}
                onClick={() => setSelectedId(itin._id)}
              >
                + Add Schedule Item
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Itinerary;
