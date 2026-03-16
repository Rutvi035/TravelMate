
/**
 * TravelMate - Profile Model
 * Defines the schema for user travel profiles in MongoDB
 */
const mongoose = require("mongoose");

/**
 * Profile Schema
 * @field user_id - Reference to the User document
 * @field full_name - The user's full name
 * @field preferred_destination - The user's preferred travel destination
 * @field budget_range - The user's budget range for travel
 * @field travel_style - The user's preferred travel style
 * @timestamps     - Automatically adds createdAt and updatedAt
 */
const ProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    full_name: { type: String },
    preferred_destination: { type: String },
    budget_range: { type: String },
    travel_style: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", ProfileSchema);
