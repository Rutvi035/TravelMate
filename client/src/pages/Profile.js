import React, { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [form, setForm] = useState({
    full_name: "",
    preferred_destination: "",
    budget_range: "",
    travel_style: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${user.id}`,
        );
        if (res.data && res.data.full_name) setForm(res.data);
      } catch (error) {
        console.log("No profile yet");
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/profile", {
        ...form,
        user_id: user.id,
      });
      setIsError(false);
      setMessage("Profile saved successfully!");
    } catch (error) {
      setIsError(true);
      setMessage("Failed to save profile");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "680px" }}>
      <div className="page-header">
        <h2>✈️ Travel Profile</h2>
        <p>Personalize your TravelMate experience</p>
      </div>

      {/* Profile Summary Card */}
      <div
        className="card"
        style={{
          background: "linear-gradient(135deg, #0a1628, #1a3a5c)",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#e8b84b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              flexShrink: 0,
            }}
          >
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <h3 style={{ color: "white", fontSize: "22px" }}>
              {form.full_name || user.username}
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "14px",
                marginTop: "4px",
              }}
            >
              {form.travel_style
                ? `${form.travel_style} traveler`
                : "Set your travel style below"}
            </p>
            {form.preferred_destination && (
              <span className="badge badge-gold" style={{ marginTop: "8px" }}>
                📍 {form.preferred_destination}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="card fade-in">
        {message && (
          <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>
            {isError ? "⚠️" : "✅"} {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Full Name</label>
              <input
                type="text"
                value={form.full_name || ""}
                placeholder="Your full name"
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
              />
            </div>
            <div className="form-group" style={{ gridColumn: "1 / -1" }}>
              <label>Preferred Destination</label>
              <input
                type="text"
                value={form.preferred_destination || ""}
                placeholder="e.g. Paris, Tokyo, Bali"
                onChange={(e) =>
                  setForm({ ...form, preferred_destination: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Budget Range</label>
              <select
                value={form.budget_range || ""}
                onChange={(e) =>
                  setForm({ ...form, budget_range: e.target.value })
                }
              >
                <option value="">Select budget</option>
                <option value="low">💚 Low (Under $500)</option>
                <option value="medium">💛 Medium ($500–$1500)</option>
                <option value="high">💎 High ($1500+)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Travel Style</label>
              <select
                value={form.travel_style || ""}
                onChange={(e) =>
                  setForm({ ...form, travel_style: e.target.value })
                }
              >
                <option value="">Select style</option>
                <option value="budget">🎒 Budget</option>
                <option value="luxury">👑 Luxury</option>
                <option value="adventure">🏔️ Adventure</option>
                <option value="corporate">💼 Corporate</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "16px",
              marginTop: "8px",
            }}
          >
            Save Profile →
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
