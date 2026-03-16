const mongoose = require("mongoose");
const User = require("./models/User");
const Profile = require("./models/Profile");
require("dotenv").config();

const clearDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected...");

    // Only clear users and profiles
    // Keep destinations and packages (sample data)
    await User.deleteMany({});
    await Profile.deleteMany({});

    console.log("✅ Users and Profiles cleared!");
    console.log("✅ Destinations and Packages kept!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

clearDB();
