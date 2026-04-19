/**
 * TravelMate - Itinerary Model
 * Defines schema for user travel itineraries
 */
const mongoose = require("mongoose");

/**
 * Itinerary Schema
 * @field user_id     - Reference to User who owns this itinerary
 * @field title       - Name of the itinerary
 * @field destination - Travel destination
 * @field start_date  - Trip start date
 * @field end_date    - Trip end date
 * @field items       - Array of schedule items
 */
const ItinerarySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    destination: { type: String, required: true },
    start_date: { type: String, required: true },
    end_date: { type: String, required: true },
    items: [{ time: String, activity: String, notes: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Itinerary", ItinerarySchema);
