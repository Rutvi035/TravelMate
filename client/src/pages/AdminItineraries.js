import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminItineraries() {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/itinerary");
        setItineraries(res.data);
      } catch (error) {
        console.error("Failed");
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h2>⚙️ Admin — All Itineraries</h2>
        <p>View all itineraries created by users on the platform</p>
      </div>

      <div className="stats-row fade-in">
        <div className="stat-card">
          <div className="stat-number">{itineraries.length}</div>
          <div className="stat-label">Total Itineraries</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {[...new Set(itineraries.map((i) => i.destination))].length}
          </div>
          <div className="stat-label">Unique Destinations</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {itineraries.reduce((sum, i) => sum + i.items.length, 0)}
          </div>
          <div className="stat-label">Schedule Items</div>
        </div>
      </div>

      <div className="card fade-in">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Destination</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Items</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {itineraries.map((itin, i) => (
                <tr key={itin._id}>
                  <td style={{ color: "#8a8a8a", fontSize: "13px" }}>
                    {i + 1}
                  </td>
                  <td style={{ fontWeight: "600" }}>{itin.title}</td>
                  <td>📍 {itin.destination}</td>
                  <td style={{ color: "#8a8a8a", fontSize: "13px" }}>
                    {itin.start_date}
                  </td>
                  <td style={{ color: "#8a8a8a", fontSize: "13px" }}>
                    {itin.end_date}
                  </td>
                  <td>
                    <span
                      style={{
                        background: "#e8f4fd",
                        color: "#2980b9",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {itin.items.length} items
                    </span>
                  </td>
                  <td style={{ color: "#8a8a8a", fontSize: "13px" }}>
                    {new Date(itin.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminItineraries;
