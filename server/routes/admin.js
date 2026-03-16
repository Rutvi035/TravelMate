/**
 * TravelMate - Admin Routes
 * Handles admin-only operations
 * @route /api/admin
 */

const express = require("express");
const User = require("../models/User");
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

module.exports = router;
