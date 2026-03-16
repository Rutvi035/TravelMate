
/**
 * TravelMate - Package Model
 * Defines the schema for travel packages in MongoDB
 */
const mongoose = require("mongoose");

/**
  * Package Schema
  * @field destination_id - Reference to the associated destination 
  * @field provider - The name of the travel package provider
  * @field price - The price of the travel package
  * @field rating - The average rating of the travel package
  * @field duration_days - The duration of the travel package in days
  * @field includes - A description of what is included in the travel package
 */

const PackageSchema = new mongoose.Schema({
  destination_id: { type: mongoose.Schema.Types.ObjectId, ref: "Destination" },
  provider: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number },
  duration_days: { type: Number },
  includes: { type: String },
});

module.exports = mongoose.model("Package", PackageSchema);
