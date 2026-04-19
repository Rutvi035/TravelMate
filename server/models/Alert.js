/**
 * TravelMate - Alert Model
 * Defines schema for user travel price alerts
 */
const mongoose = require("mongoose");

/**
 * Alert Schema
 * @field user_id     - Reference to User who owns this alert
 * @field destination - Destination being monitored
 * @field max_price   - Maximum price threshold for alert
 * @field active      - Whether alert is currently active
 */
const AlertSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: { type: String, required: true },
    max_price: { type: Number, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Alert", AlertSchema);
