/**
 * TravelMate - Search Routes
 * Handles destination search functionality
 * @route /api/search
 */

const express = require("express");
const Destination = require("../models/Destination");
const router = express.Router();

/**
 * Search destinations by name or country
 * @route  GET /api/search
 * @access Public
 * @param  {string} query - Search keyword (e.g. Paris, Japan)
 * @return {Array} List of matching destinations
 */
router.get("/", async (req, res) => {
  const { query } = req.query;
  try {
    let results;

    if (!query || query.trim() === "") {
      // No query = return all destinations
      results = await Destination.find({});
    } else {
      // Search by name or country
      results = await Destination.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { country: { $regex: query, $options: "i" } },
        ],
      });
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Search failed", error: error.message });
  }
});

module.exports = router;
