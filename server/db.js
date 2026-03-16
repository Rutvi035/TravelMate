
/**
 * TravelMate - Database Connection
 * Establishes connection to MongoDB Atlas using Mongoose
 */const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Connects to MongoDB Atlas
 * Exits the process if connection fails
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit with failure code
  }
};

module.exports = connectDB;
