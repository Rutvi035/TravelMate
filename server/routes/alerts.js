/**
 * TravelMate - Alerts Routes
 * Handles travel price alert subscriptions
 * @route /api/alerts
 */
const express = require("express");
const Alert = require("../models/Alert");
const router = express.Router();

/**
 * Subscribe to a travel alert
 * @route  POST /api/alerts
 * @param  {string} user_id, destination, max_price
 * @return {object} Success message and new alert
 */
router.post("/", async (req, res) => {
  const { user_id, destination, max_price } = req.body;
  try {
    const alert = new Alert({ user_id, destination, max_price });
    await alert.save();
    res.status(201).json({ message: "Alert created successfully", alert });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create alert", error: error.message });
  }
});

/**
 * Get all alerts for a user
 * @route  GET /api/alerts/:user_id
 * @return {Array} List of user's active alerts
 */
router.get("/:user_id", async (req, res) => {
  try {
    const alerts = await Alert.find({ user_id: req.params.user_id }).sort({
      createdAt: -1,
    });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch alerts" });
  }
});

/**
 * Delete an alert by ID
 * @route  DELETE /api/alerts/:id
 * @return {object} Success message
 */
router.delete("/:id", async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.json({ message: "Alert deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete alert" });
  }
});

module.exports = router;
