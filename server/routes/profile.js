/**
 * TravelMate - Profile Routes
 * Handles saving and retrieving user travel profiles
 * @route /api/profile
 */

const express = require("express");
const Profile = require("../models/Profile");
const router = express.Router();

/**
 * Save or update a user profile
 * @route  POST /api/profile
 * @access Private
 * @param  {string} user_id               - ID of the user
 * @param  {string} full_name             - Full name of the user
 * @param  {string} preferred_destination - Preferred travel destination
 * @param  {string} budget_range          - Budget preference
 * @param  {string} travel_style          - Travel style preference
 * @return {object} Success message
 */
router.post("/", async (req, res) => {
  const {
    user_id,
    full_name,
    preferred_destination,
    budget_range,
    travel_style,
  } = req.body;
  try {
    // Check if profile already exists for this user
    const existing = await Profile.findOne({ user_id });

    if (existing) {
      // Update existing profile
      await Profile.updateOne(
        { user_id },
        { full_name, preferred_destination, budget_range, travel_style },
      );
    } else {
      // Create new profile
      const profile = new Profile({
        user_id,
        full_name,
        preferred_destination,
        budget_range,
        travel_style,
      });
      await profile.save();
    }
    res.json({ message: "Profile saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save profile", error: error.message });
  }
});

/**
 * Get a user profile by user ID
 * @route  GET /api/profile/:user_id
 * @access Private
 * @param  {string} user_id - ID of the user
 * @return {object} Profile data or empty object
 */
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ user_id: req.params.user_id });
    res.json(profile || {});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

module.exports = router;
