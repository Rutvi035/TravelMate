/**
 * TravelMate - Main Server File
 * Entry point for the Express application
 * Sets up middleware, routes, and starts the server
 */
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

// Import all route handlers
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const searchRoutes = require("./routes/search");
const packageRoutes = require("./routes/packages");
const adminRoutes = require("./routes/admin");

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware - enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Register API routes
app.use("/api/auth", authRoutes); // Authentication Routes
app.use("/api/profile", profileRoutes); // User Profile Routes
app.use("/api/search", searchRoutes); // Destination Search Routes
app.use("/api/packages", packageRoutes);   // Travel Package Routes
app.use("/api/admin", adminRoutes); // Admin Routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
