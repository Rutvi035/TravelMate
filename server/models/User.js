/**
 * TravelMate - User Model
 * Defines the schema for user accounts in MongoDB
 */
const mongoose = require("mongoose");

/**
 * User Schema
 * @field username - Unique username for the user
 * @field email    - Unique email address
 * @field password - Hashed password (bcrypt)
 * @field role     - Either 'user' or 'admin'
 * @timestamps     - Automatically adds createdAt and updatedAt
 */
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
