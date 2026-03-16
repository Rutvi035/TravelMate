const mongoose = require("mongoose");
const Destination = require("./models/Destination");
const Package = require("./models/Package");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const seedData = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");

    // Clear existing data
    await Destination.deleteMany();
    await Package.deleteMany();
    await User.deleteMany();
    console.log("Cleared old data...");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      username: "admin",
      email: "admin@travelmate.com",
      password: hashedPassword, //original password - admin123
      role: "admin",
    });
    console.log("Admin user created!");

    // Insert destinations
    const destinations = await Destination.insertMany([
      {
        name: "Paris",
        country: "France",
        description:
          "The City of Light — romance, art, and world-class cuisine await you.",
      },
      {
        name: "Tokyo",
        country: "Japan",
        description:
          "Where ancient temples meet neon-lit streets and futuristic technology.",
      },
      {
        name: "Bali",
        country: "Indonesia",
        description:
          "A tropical paradise of lush rice terraces, temples, and pristine beaches.",
      },
      {
        name: "New York",
        country: "USA",
        description:
          "The city that never sleeps — iconic skyline, culture, and endless energy.",
      },
      {
        name: "Dubai",
        country: "UAE",
        description:
          "Luxury redefined — towering skyscrapers, desert safaris, and golden beaches.",
      },
      {
        name: "Rome",
        country: "Italy",
        description:
          "The Eternal City — ancient ruins, Renaissance art, and incredible food.",
      },
      {
        name: "Santorini",
        country: "Greece",
        description:
          "Breathtaking sunsets, white-washed cliffs, and crystal-blue Aegean waters.",
      },
      {
        name: "Maldives",
        country: "Maldives",
        description:
          "Overwater bungalows, coral reefs, and the clearest turquoise waters on Earth.",
      },
      {
        name: "Barcelona",
        country: "Spain",
        description:
          "Gaudí architecture, vibrant nightlife, and stunning Mediterranean beaches.",
      },
      {
        name: "Sydney",
        country: "Australia",
        description:
          "Iconic Opera House, golden beaches, and a laid-back harbour lifestyle.",
      },
    ]);
    console.log("✅ Destinations inserted!");

    // Insert packages
    await Package.insertMany([
      // Paris
      {
        destination_id: destinations[0]._id,
        provider: "TravelCo",
        price: 1200,
        rating: 4.5,
        duration_days: 7,
        includes: "Flight, Hotel, Breakfast",
      },
      {
        destination_id: destinations[0]._id,
        provider: "GoTravel",
        price: 999,
        rating: 4.2,
        duration_days: 7,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[0]._id,
        provider: "SkyHigh",
        price: 1450,
        rating: 4.7,
        duration_days: 10,
        includes: "Flight, Hotel, Tours",
      },
      {
        destination_id: destinations[0]._id,
        provider: "LuxeVoyage",
        price: 2200,
        rating: 4.9,
        duration_days: 10,
        includes: "Business Flight, 5-Star Hotel, Tours",
      },
      {
        destination_id: destinations[0]._id,
        provider: "BudgetJet",
        price: 750,
        rating: 3.9,
        duration_days: 5,
        includes: "Hotel only",
      },

      // Tokyo
      {
        destination_id: destinations[1]._id,
        provider: "TravelCo",
        price: 1800,
        rating: 4.8,
        duration_days: 10,
        includes: "Flight, Hotel, Tours",
      },
      {
        destination_id: destinations[1]._id,
        provider: "SkyHigh",
        price: 1500,
        rating: 4.3,
        duration_days: 10,
        includes: "Flight, Hotel",
      },
      {
        destination_id: destinations[1]._id,
        provider: "AsiaExplorer",
        price: 2100,
        rating: 4.9,
        duration_days: 14,
        includes: "Flight, Hotel, Rail Pass, Tours",
      },
      {
        destination_id: destinations[1]._id,
        provider: "GoTravel",
        price: 1350,
        rating: 4.1,
        duration_days: 8,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[1]._id,
        provider: "BudgetJet",
        price: 1100,
        rating: 3.8,
        duration_days: 7,
        includes: "Flight only",
      },

      // Bali
      {
        destination_id: destinations[2]._id,
        provider: "BeachTrips",
        price: 800,
        rating: 4.6,
        duration_days: 7,
        includes: "Hotel, Tours",
      },
      {
        destination_id: destinations[2]._id,
        provider: "GoTravel",
        price: 750,
        rating: 4.1,
        duration_days: 7,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[2]._id,
        provider: "TravelCo",
        price: 1100,
        rating: 4.7,
        duration_days: 10,
        includes: "Flight, Hotel, Spa, Tours",
      },
      {
        destination_id: destinations[2]._id,
        provider: "LuxeVoyage",
        price: 1800,
        rating: 4.9,
        duration_days: 10,
        includes: "Business Flight, Villa, Private Tours",
      },
      {
        destination_id: destinations[2]._id,
        provider: "BudgetJet",
        price: 600,
        rating: 3.7,
        duration_days: 5,
        includes: "Hotel only",
      },

      // New York
      {
        destination_id: destinations[3]._id,
        provider: "TravelCo",
        price: 1300,
        rating: 4.4,
        duration_days: 7,
        includes: "Flight, Hotel, City Pass",
      },
      {
        destination_id: destinations[3]._id,
        provider: "SkyHigh",
        price: 1100,
        rating: 4.2,
        duration_days: 6,
        includes: "Flight, Hotel",
      },
      {
        destination_id: destinations[3]._id,
        provider: "LuxeVoyage",
        price: 2500,
        rating: 4.8,
        duration_days: 7,
        includes: "Business Flight, 5-Star Hotel, Broadway Show",
      },
      {
        destination_id: destinations[3]._id,
        provider: "GoTravel",
        price: 950,
        rating: 4.0,
        duration_days: 5,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[3]._id,
        provider: "BudgetJet",
        price: 700,
        rating: 3.8,
        duration_days: 4,
        includes: "Flight only",
      },

      // Dubai
      {
        destination_id: destinations[4]._id,
        provider: "LuxeVoyage",
        price: 2800,
        rating: 4.9,
        duration_days: 7,
        includes: "Business Flight, 5-Star Hotel, Desert Safari",
      },
      {
        destination_id: destinations[4]._id,
        provider: "TravelCo",
        price: 1600,
        rating: 4.6,
        duration_days: 7,
        includes: "Flight, Hotel, City Tour",
      },
      {
        destination_id: destinations[4]._id,
        provider: "SkyHigh",
        price: 1900,
        rating: 4.7,
        duration_days: 10,
        includes: "Flight, Hotel, Desert Safari, Cruise",
      },
      {
        destination_id: destinations[4]._id,
        provider: "GoTravel",
        price: 1200,
        rating: 4.2,
        duration_days: 6,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[4]._id,
        provider: "BudgetJet",
        price: 900,
        rating: 3.9,
        duration_days: 5,
        includes: "Flight, Hotel",
      },

      // Rome
      {
        destination_id: destinations[5]._id,
        provider: "TravelCo",
        price: 1100,
        rating: 4.5,
        duration_days: 7,
        includes: "Flight, Hotel, Museum Pass",
      },
      {
        destination_id: destinations[5]._id,
        provider: "GoTravel",
        price: 890,
        rating: 4.1,
        duration_days: 6,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[5]._id,
        provider: "LuxeVoyage",
        price: 2100,
        rating: 4.8,
        duration_days: 8,
        includes: "Business Flight, Boutique Hotel, Private Tours",
      },
      {
        destination_id: destinations[5]._id,
        provider: "EuroTrails",
        price: 1350,
        rating: 4.4,
        duration_days: 9,
        includes: "Flight, Hotel, Food Tour, Colosseum Tour",
      },
      {
        destination_id: destinations[5]._id,
        provider: "BudgetJet",
        price: 680,
        rating: 3.8,
        duration_days: 5,
        includes: "Hotel only",
      },

      // Santorini
      {
        destination_id: destinations[6]._id,
        provider: "LuxeVoyage",
        price: 3200,
        rating: 5.0,
        duration_days: 7,
        includes: "Business Flight, Cliff Hotel, Sunset Cruise",
      },
      {
        destination_id: destinations[6]._id,
        provider: "TravelCo",
        price: 1700,
        rating: 4.7,
        duration_days: 7,
        includes: "Flight, Hotel, Island Tour",
      },
      {
        destination_id: destinations[6]._id,
        provider: "EuroTrails",
        price: 1400,
        rating: 4.4,
        duration_days: 6,
        includes: "Flight, Hotel",
      },
      {
        destination_id: destinations[6]._id,
        provider: "GoTravel",
        price: 1150,
        rating: 4.0,
        duration_days: 5,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[6]._id,
        provider: "SkyHigh",
        price: 1950,
        rating: 4.6,
        duration_days: 8,
        includes: "Flight, Hotel, Wine Tour, Cruise",
      },

      // Maldives
      {
        destination_id: destinations[7]._id,
        provider: "LuxeVoyage",
        price: 4500,
        rating: 5.0,
        duration_days: 7,
        includes: "Business Flight, Overwater Villa, All Inclusive",
      },
      {
        destination_id: destinations[7]._id,
        provider: "BeachTrips",
        price: 2800,
        rating: 4.8,
        duration_days: 7,
        includes: "Flight, Beach Villa, Breakfast",
      },
      {
        destination_id: destinations[7]._id,
        provider: "TravelCo",
        price: 2200,
        rating: 4.6,
        duration_days: 6,
        includes: "Flight, Hotel, Snorkeling",
      },
      {
        destination_id: destinations[7]._id,
        provider: "SkyHigh",
        price: 3100,
        rating: 4.7,
        duration_days: 8,
        includes: "Flight, Overwater Bungalow, Diving",
      },
      {
        destination_id: destinations[7]._id,
        provider: "GoTravel",
        price: 1900,
        rating: 4.2,
        duration_days: 5,
        includes: "Flight, Hotel",
      },

      // Barcelona
      {
        destination_id: destinations[8]._id,
        provider: "EuroTrails",
        price: 1050,
        rating: 4.5,
        duration_days: 7,
        includes: "Flight, Hotel, Gaudi Tour",
      },
      {
        destination_id: destinations[8]._id,
        provider: "TravelCo",
        price: 1200,
        rating: 4.6,
        duration_days: 8,
        includes: "Flight, Hotel, Food Tour, Beach Day",
      },
      {
        destination_id: destinations[8]._id,
        provider: "LuxeVoyage",
        price: 2300,
        rating: 4.9,
        duration_days: 8,
        includes: "Business Flight, Boutique Hotel, Private Tours",
      },
      {
        destination_id: destinations[8]._id,
        provider: "GoTravel",
        price: 820,
        rating: 4.0,
        duration_days: 6,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[8]._id,
        provider: "BudgetJet",
        price: 650,
        rating: 3.7,
        duration_days: 5,
        includes: "Flight only",
      },

      // Sydney
      {
        destination_id: destinations[9]._id,
        provider: "TravelCo",
        price: 2100,
        rating: 4.6,
        duration_days: 10,
        includes: "Flight, Hotel, Harbour Cruise",
      },
      {
        destination_id: destinations[9]._id,
        provider: "SkyHigh",
        price: 1850,
        rating: 4.4,
        duration_days: 9,
        includes: "Flight, Hotel",
      },
      {
        destination_id: destinations[9]._id,
        provider: "LuxeVoyage",
        price: 3500,
        rating: 4.9,
        duration_days: 10,
        includes: "Business Flight, 5-Star Hotel, Opera & Harbour Tour",
      },
      {
        destination_id: destinations[9]._id,
        provider: "GoTravel",
        price: 1600,
        rating: 4.1,
        duration_days: 8,
        includes: "Hotel only",
      },
      {
        destination_id: destinations[9]._id,
        provider: "BudgetJet",
        price: 1400,
        rating: 3.8,
        duration_days: 7,
        includes: "Flight only",
      },
    ]);
    console.log("Packages inserted!");

    console.log("All sample data inserted successfully!");
    console.log("10 Destinations added");
    console.log("50 Packages added (5 per destination)");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

seedData();
