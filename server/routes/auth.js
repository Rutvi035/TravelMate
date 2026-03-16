/**
 * TravelMate - Authentication Routes
 * Handles user registration and login
 * @route /api/auth
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

/**
 * Register a new user
 * @route  POST /api/auth/register
 * @access Public
 * @param  {string} username - Desired username
 * @param  {string} email    - User email address
 * @param  {string} password - User password (will be hashed)
 * @return {object} Success message and new user ID
 */
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hash the password before saving to database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

/**
 * Login an existing user
 * @route  POST /api/auth/login
 * @access Public
 * @param  {string} email    - User email address
 * @param  {string} password - User password
 * @return {object} JWT token and user details
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token valid for 24 hours
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

module.exports = router;
