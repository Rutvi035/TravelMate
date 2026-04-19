// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AdminPanel() {
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user || user.role !== "admin") {
//       navigate("/dashboard");
//       return;
//     }
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/admin/users");
//         setUsers(res.data);
//       } catch (error) {
//         console.error("Failed");
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="container">
//       <div className="page-header">
//         <h2>⚙️ Admin Panel</h2>
//         <p>Manage all registered users on the platform</p>
//       </div>

//       {/* Stats */}
//       <div className="stats-row fade-in">
//         <div className="stat-card">
//           <div className="stat-number">{users.length}</div>
//           <div className="stat-label">Total Users</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">
//             {users.filter((u) => u.role === "admin").length}
//           </div>
//           <div className="stat-label">Admins</div>
//         </div>
//         <div className="stat-card">
//           <div className="stat-number">
//             {users.filter((u) => u.role === "user").length}
//           </div>
//           <div className="stat-label">Regular Users</div>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="card fade-in">
//         <div className="page-header">
//           <h2>All Registered Users</h2>
//         </div>
//         <div className="table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Joined</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((u, i) => (
//                 <tr key={u._id}>
//                   <td style={{ color: "#8a8a8a", fontSize: "13px" }}>
//                     {i + 1}
//                   </td>
//                   <td>
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "10px",
//                       }}
//                     >
//                       <div
//                         style={{
//                           width: "32px",
//                           height: "32px",
//                           borderRadius: "50%",
//                           background: "#e8b84b",
//                           display: "flex",
//                           alignItems: "center",
//                           justifyContent: "center",
//                           fontSize: "14px",
//                           fontWeight: "700",
//                           color: "#0a1628",
//                           flexShrink: 0,
//                         }}
//                       >
//                         {u.username[0].toUpperCase()}
//                       </div>
//                       {u.username}
//                     </div>
//                   </td>
//                   <td style={{ color: "#8a8a8a" }}>{u.email}</td>
//                   <td>
//                     <span
//                       className={`role-badge ${u.role === "admin" ? "role-admin" : "role-user"}`}
//                     >
//                       {u.role === "admin" ? "👑 Admin" : "👤 User"}
//                     </span>
//                   </td>
//                   <td style={{ color: "#8a8a8a", fontSize: "13px" }}>
//                     {new Date(u.createdAt).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "short",
//                       day: "numeric",
//                     })}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminPanel;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [totalItineraries, setTotalItineraries] = useState(0);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      // Fetch all users
      const usersRes = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(usersRes.data);

      // Fetch all itineraries count
      const itinRes = await axios.get("http://localhost:5000/api/itinerary");
      setTotalItineraries(itinRes.data.length);

      // Fetch all alerts count
      const alertsRes = await axios.get(
        "http://localhost:5000/api/admin/alerts",
      );
      setTotalAlerts(alertsRes.data.length);
    } catch (error) {
      console.error("Failed to fetch admin data");
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Admin Panel</h2>
        <p>Manage all registered users and monitor platform activity</p>
      </div>

      {/* Stats — now includes itineraries and alerts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
        className="fade-in"
      >
        <div className="stat-card">
          <div className="stat-number">{users.length}</div>
          <div className="stat-label">Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.role === "admin").length}
          </div>
          <div className="stat-label">Admins</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {users.filter((u) => u.role === "user").length}
          </div>
          <div className="stat-label">Regular Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalItineraries}</div>
          <div className="stat-label">Itineraries</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalAlerts}</div>
          <div className="stat-label">Active Alerts</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card fade-in">
        <div className="page-header">
          <h2>All Registered Users</h2>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u._id}>
                  <td style={{ color: "#8a8a8a", fontSize: "13px" }}>
                    {i + 1}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "#e8b84b",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: "700",
                          color: "#0a1628",
                          flexShrink: 0,
                        }}
                      >
                        {u.username[0].toUpperCase()}
                      </div>
                      {u.username}
                    </div>
                  </td>
                  <td style={{ color: "#8a8a8a" }}>{u.email}</td>
                  <td>
                    <span
                      className={`role-badge ${u.role === "admin" ? "role-admin" : "role-user"}`}
                    >
                      {u.role === "admin" ? "Admin" : "User"}
                    </span>
                  </td>
                  <td style={{ color: "#8a8a8a", fontSize: "13px" }}>
                    {new Date(u.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
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

export default AdminPanel;