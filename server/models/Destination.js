/**
 * TravelMate - Destination Model
 * Defines the schema for travel destinations in MongoDB
 */
const mongoose = require("mongoose");

/**
  * Destination Schema
  * @field name - The name of the destination
  * @field country - The country where the destination is located
  * @field description - A brief description of the destination
  * @field image_url - The URL of an image representing the destination
 */

const DestinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
});

module.exports = mongoose.model("Destination", DestinationSchema);
