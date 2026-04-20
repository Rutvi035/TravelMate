/**
 * TravelMate - Admin Routes
 * Handles admin-only operations
 * @route /api/admin
 */

const express = require("express");
const User = require("../models/User");
const Alert = require("../models/Alert");

const router = express.Router();

/**
 * Get all registered users (Admin only)
 * @route  GET /api/admin/users
 * @access Admin
 * @return {Array} List of all users (passwords excluded)
 */
router.get("/users", async (req, res) => {
  try {
    // Fetch all users but exclude password field for security
    const users = await User.find({}, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * Get all alerts across all users (Admin only)
 * @route  GET /api/admin/alerts
 * @return {Array} All alert documents with user info
 */
router.get("/alerts", async (req, res) => {
  try {
    const alerts = await Alert.find({})
      .populate("user_id", "username email")
      .sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
});

/**
 * Get all itineraries across all users (Admin only)
 * @route  GET /api/admin/itineraries
 * @return {Array} All itinerary documents with user info
 */
router.get("/itineraries", async (req, res) => {
  try {
    const Itinerary = require("../models/Itinerary");
    const itineraries = await Itinerary.find({})
      .populate("user_id", "username email")
      .sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch itineraries" });
  }
});

module.exports = router;
