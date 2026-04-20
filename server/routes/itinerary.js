// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Dashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();
//   // const [destinations, setDestinations] = useState([]);
//   // const [totalPackages, setTotalPackages] = useState(0);
//   const [destinations, setDestinations] = useState([]);
//   const [totalPackages, setTotalPackages] = useState(0);
//   const [totalItineraries, setTotalItineraries] = useState(0);
//   const [totalAlerts, setTotalAlerts] = useState(0);

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     fetchDestinations();
//   }, []);

//   // const fetchDestinations = async () => {
//   //   try {
//   //     // Fetch all destinations using empty/wildcard search
//   //     const res = await axios.get("http://localhost:5000/api/search?query=");
//   //     setDestinations(res.data);

//   //     // Count total packages across all destinations
//   //     let count = 0;
//   //     for (const dest of res.data) {
//   //       const pkgRes = await axios.get(
//   //         `http://localhost:5000/api/packages/${dest._id}`,
//   //       );
//   //       count += pkgRes.data.length;
//   //     }
//   //     setTotalPackages(count);
//   //   } catch (error) {
//   //     console.error("Failed to fetch destinations");
//   //   }
//   // };
//   const fetchDestinations = async () => {
//     try {
//       // Fetch destinations
//       const res = await axios.get("http://localhost:5000/api/search?query=");
//       setDestinations(res.data);

//       // Count total packages
//       let count = 0;
//       for (const dest of res.data) {
//         const pkgRes = await axios.get(
//           `http://localhost:5000/api/packages/${dest._id}`,
//         );
//         count += pkgRes.data.length;
//       }
//       setTotalPackages(count);

//       // Fetch user's itineraries count
//       const itinRes = await axios.get(
//         `http://localhost:5000/api/itinerary/${user.id}`,
//       );
//       setTotalItineraries(itinRes.data.length);

//       // Fetch user's alerts count
//       const alertRes = await axios.get(
//         `http://localhost:5000/api/alerts/${user.id}`,
//       );
//       setTotalAlerts(alertRes.data.length);
//     } catch (error) {
//       console.error("Failed to fetch data");
//     }
//   };
//   // Emoji map for known destinations, fallback for unknown
//   const getEmoji = (name) => {
//     const map = {
//       Paris: "🗼",
//       Tokyo: "⛩️",
//       Bali: "🌴",
//       "New York": "🗽",
//       Dubai: "🏙️",
//       Rome: "🏛️",
//       Santorini: "🌅",
//       Maldives: "🏝️",
//       Barcelona: "🎨",
//       Sydney: "🦘",
//     };
//     return map[name] || "🌍";
//   };

//   // Tag map for known destinations
//   const getTag = (index) => {
//     const tags = [
//       "Most Popular",
//       "Trending",
//       "Best Value",
//       "Must Visit",
//       "Luxury Pick",
//       "Hidden Gem",
//       "Top Rated",
//       "Staff Pick",
//       "New",
//       "Featured",
//     ];
//     return tags[index % tags.length];
//   };

//   if (!user) return null;

//   return (
//     <div>
//       {/* Hero */}
//       <div className="hero">
//         <h1>
//           Hello, <span>{user.username}</span> 👋
//         </h1>
//         <p>
//           Where would you like to explore today? Your next adventure is just a
//           search away.
//         </p>
//         <button
//           className="btn btn-primary"
//           onClick={() => navigate("/search")}
//           style={{ fontSize: "16px", padding: "16px 36px" }}
//         >
//           🔍 Start Exploring
//         </button>
//       </div>

//       <div className="container">
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(4, 1fr)",
//             gap: "20px",
//             marginBottom: "30px",
//           }}
//           className="fade-in"
//         >
//           <div className="stat-card">
//             <div className="stat-number">{destinations.length}</div>
//             <div className="stat-label">Destinations</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">{totalPackages}</div>
//             <div className="stat-label">Packages</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">{totalItineraries}</div>
//             <div className="stat-label">My Itineraries</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">{totalAlerts}</div>
//             <div className="stat-label">My Alerts</div>
//           </div>
//         </div>
//         {/* Stats — now dynamic */}
//         {/* <div className="stats-row fade-in">
//           <div className="stat-card">
//             <div className="stat-number">{destinations.length}</div>
//             <div className="stat-label">Destinations</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">{totalPackages}</div>
//             <div className="stat-label">Travel Packages</div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-number">2s</div>
//             <div className="stat-label">Avg Search Time</div>
//           </div>
//         </div> */}

//         {/* Quick Actions */}
//         <div className="card fade-in">
//           <div className="page-header">
//             <h2>Quick Actions</h2>
//             <p>Everything you need to plan your perfect trip</p>
//           </div>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//               gap: "16px",
//             }}
//           >
//             <div
//               className="card-sm"
//               style={{ cursor: "pointer", textAlign: "center" }}
//               onClick={() => navigate("/search")}
//             >
//               <div style={{ fontSize: "36px", marginBottom: "12px" }}>🔍</div>
//               <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>Search</h3>
//               <p style={{ fontSize: "13px", color: "#8a8a8a" }}>
//                 Find destinations worldwide
//               </p>
//             </div>

//             <div
//               className="card-sm"
//               style={{ cursor: "pointer", textAlign: "center" }}
//               onClick={() => navigate("/profile")}
//             >
//               <div style={{ fontSize: "36px", marginBottom: "12px" }}>👤</div>
//               <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>Profile</h3>
//               <p style={{ fontSize: "13px", color: "#8a8a8a" }}>
//                 Set your travel preferences
//               </p>
//             </div>

//             {user.role === "admin" && (
//               <div
//                 className="card-sm"
//                 style={{ cursor: "pointer", textAlign: "center" }}
//                 onClick={() => navigate("/admin")}
//               >
//                 <div style={{ fontSize: "36px", marginBottom: "12px" }}>⚙️</div>
//                 <h3 style={{ fontSize: "18px", marginBottom: "6px" }}>Admin</h3>
//                 <p style={{ fontSize: "13px", color: "#8a8a8a" }}>
//                   Manage users & data
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Featured Destinations — now dynamic from DB */}
//         <div className="card fade-in">
//           <div className="page-header">
//             <h2>Featured Destinations</h2>
//             <p>
//               {destinations.length} destinations available — updated in real
//               time from database
//             </p>
//           </div>

//           {destinations.length === 0 ? (
//             <div
//               style={{ textAlign: "center", padding: "40px", color: "#8a8a8a" }}
//             >
//               <div style={{ fontSize: "40px", marginBottom: "12px" }}>⏳</div>
//               <p>Loading destinations...</p>
//             </div>
//           ) : (
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
//                 gap: "20px",
//               }}
//             >
//               {destinations.map((dest, i) => (
//                 <div
//                   className="dest-card fade-in"
//                   key={dest._id}
//                   style={{ animationDelay: `${i * 0.08}s` }}
//                 >
//                   <div className="dest-card-header">
//                     <div style={{ fontSize: "40px", marginBottom: "10px" }}>
//                       {getEmoji(dest.name)}
//                     </div>
//                     <h3>{dest.name}</h3>
//                     <p>{dest.country}</p>
//                     <span
//                       className="badge badge-gold"
//                       style={{
//                         position: "absolute",
//                         top: "16px",
//                         right: "16px",
//                       }}
//                     >
//                       {getTag(i)}
//                     </span>
//                   </div>
//                   <div style={{ padding: "16px 20px" }}>
//                     <p
//                       style={{
//                         fontSize: "13px",
//                         color: "#8a8a8a",
//                         marginBottom: "14px",
//                         lineHeight: "1.6",
//                       }}
//                     >
//                       {dest.description}
//                     </p>
//                     <button
//                       className="btn btn-primary"
//                       style={{
//                         width: "100%",
//                         justifyContent: "center",
//                         padding: "10px",
//                       }}
//                       onClick={() => navigate(`/packages/${dest._id}`)}
//                     >
//                       View Packages →
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
/**
 * TravelMate - Itinerary Routes
 * Handles itinerary CRUD operations
 * @route /api/itinerary
 */

const express = require("express");
const router = express.Router();

/**
 * Get ALL itineraries (for admin overview)
 * @route  GET /api/itinerary
 * @access Public (but typically called by admin)
 * @return {Array} All itineraries from all users
 */
router.get("/", async (req, res) => {
  try {
    const Itinerary = require("../models/Itinerary");
    const itineraries = await Itinerary.find({}).sort({ createdAt: -1 }); // Most recent first
    res.json(itineraries);
  } catch (error) {
    console.error("Error fetching all itineraries:", error);
    res.status(500).json({ message: "Failed to fetch itineraries" });
  }
});

/**
 * Get itineraries for a specific user
 * @route  GET /api/itinerary/:userId
 * @access Public
 * @param  {String} userId - The user's ID
 * @return {Array} User's itineraries
 */
router.get("/:userId", async (req, res) => {
  try {
    const Itinerary = require("../models/Itinerary");
    const itineraries = await Itinerary.find({
      user_id: req.params.userId,
    }).sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (error) {
    console.error("Error fetching user itineraries:", error);
    res.status(500).json({ message: "Failed to fetch user itineraries" });
  }
});

/**
 * Create a new itinerary
 * @route  POST /api/itinerary
 * @access Public
 * @body   {Object} Itinerary data (userId, title, destination, start_date, end_date, items)
 * @return {Object} Created itinerary
 */
router.post("/", async (req, res) => {
  try {
    const Itinerary = require("../models/Itinerary");
    const { user_id, title, destination, start_date, end_date, items } =
      req.body;

    // Validation
    if (!user_id || !title || !destination || !start_date || !end_date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newItinerary = new Itinerary({
      user_id,
      title,
      destination,
      start_date,
      end_date,
      items: items || [],
    });

    const savedItinerary = await newItinerary.save();
    res.status(201).json(savedItinerary);
  } catch (error) {
    console.error("Error creating itinerary:", error);
    res.status(500).json({ message: "Failed to create itinerary" });
  }
});

/**
 * Update an existing itinerary
 * @route  PUT /api/itinerary/:id
 * @access Public
 * @param  {String} id - Itinerary ID
 * @body   {Object} Updated itinerary data
 * @return {Object} Updated itinerary
 */
/**
 * Add an item to an itinerary's schedule
 * @route  PUT /api/itinerary/:id/items
 * @access Public
 * @param  {String} id - Itinerary ID
 * @body   {Object} Item data (time, activity, notes)
 * @return {Object} Updated itinerary
 */
router.put("/:id/items", async (req, res) => {
  try {
    const Itinerary = require("../models/Itinerary");
    const { time, activity, notes } = req.body;

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      { $push: { items: { time, activity, notes } } },
      { new: true },
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json(updatedItinerary);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Failed to add item" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const Itinerary = require("../models/Itinerary");
    const { title, destination, start_date, end_date, items } = req.body;

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      {
        title,
        destination,
        start_date,
        end_date,
        items,
      },
      { new: true, runValidators: true },
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json(updatedItinerary);
  } catch (error) {
    console.error("Error updating itinerary:", error);
    res.status(500).json({ message: "Failed to update itinerary" });
  }
});

/**
 * Delete an itinerary
 * @route  DELETE /api/itinerary/:id
 * @access Public
 * @param  {String} id - Itinerary ID
 * @return {Object} Success message
 */
router.delete("/:id", async (req, res) => {
  try {
    const Itinerary = require("../models/Itinerary");
    const deletedItinerary = await Itinerary.findByIdAndDelete(req.params.id);

    if (!deletedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    console.error("Error deleting itinerary:", error);
    res.status(500).json({ message: "Failed to delete itinerary" });
  }
});

module.exports = router;
