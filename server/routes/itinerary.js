/**
 * TravelMate - Itinerary Routes
 * Handles creating, reading, and deleting itineraries
 * @route /api/itinerary
 */
const express = require("express");
const Itinerary = require("../models/Itinerary");
const router = express.Router();

/**
 * Create a new itinerary
 * @route  POST /api/itinerary
 * @param  {string} user_id, title, destination, start_date, end_date, items
 * @return {object} Success message and new itinerary ID
 */
router.post("/", async (req, res) => {
  const { user_id, title, destination, start_date, end_date, items } = req.body;
  try {
    const itinerary = new Itinerary({
      user_id,
      title,
      destination,
      start_date,
      end_date,
      items: items || [],
    });
    await itinerary.save();
    res
      .status(201)
      .json({ message: "Itinerary created successfully", itinerary });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create itinerary", error: error.message });
  }
});

/**
 * Get all itineraries for a user
 * @route  GET /api/itinerary/:user_id
 * @return {Array} List of user's itineraries
 */
router.get("/:user_id", async (req, res) => {
  try {
    const itineraries = await Itinerary.find({
      user_id: req.params.user_id,
    }).sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch itineraries" });
  }
});

/**
 * Add an item to an existing itinerary
 * @route  PUT /api/itinerary/:id/items
 * @param  {string} time, activity, notes
 * @return {object} Updated itinerary
 */
router.put("/:id/items", async (req, res) => {
  const { time, activity, notes } = req.body;
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(
      req.params.id,
      { $push: { items: { time, activity, notes } } },
      { new: true },
    );
    res.json({ message: "Item added successfully", itinerary });
  } catch (error) {
    res.status(500).json({ message: "Failed to add item" });
  }
});

/**
 * Delete an itinerary by ID
 * @route  DELETE /api/itinerary/:id
 * @return {object} Success message
 */
router.delete("/:id", async (req, res) => {
  try {
    await Itinerary.findByIdAndDelete(req.params.id);
    res.json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete itinerary" });
  }
});

/**
 * Get all itineraries (Admin only)
 * @route  GET /api/itinerary
 * @return {Array} All itineraries in the system
 */
router.get("/", async (req, res) => {
  try {
    const itineraries = await Itinerary.find({}).sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all itineraries" });
  }
});

module.exports = router;
