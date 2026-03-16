/**
 * TravelMate - Package Routes
 * Handles travel package comparison by destination
 * @route /api/packages
 */

const express = require("express");
const Package = require("../models/Package");
const router = express.Router();

/**
 * Get all packages for a specific destination
 * @route  GET /api/packages/:destination_id
 * @access Public
 * @param  {string} destination_id - MongoDB ID of the destination
 * @return {Array} List of packages sorted by price (ascending)
 */
router.get("/:destination_id", async (req, res) => {
  try {
    // Fetch packages and sort by price lowest first
    const packages = await Package.find({
      destination_id: req.params.destination_id,
    }).sort({ price: 1 });

    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch packages" });
  }
});

module.exports = router;
