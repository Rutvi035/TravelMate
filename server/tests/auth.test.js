const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Itinerary = require("../models/Itinerary");
const alertRoutes = require("../routes/alerts");
const itineraryRoutes = require("../routes/itinerary");

// Import models and routes
const User = require("../models/User");
const authRoutes = require("../routes/auth");
const profileRoutes = require("../routes/profile");
const searchRoutes = require("../routes/search");

// Create test app
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/itinerary", itineraryRoutes);
app.use("/api/alerts", alertRoutes);

// Connect to DB before tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Clean up test users after tests
afterAll(async () => {
  await User.deleteMany({ email: /testuser/i });
  await mongoose.connection.close();
});

// ─────────────────────────────────────────
// TEST 1: Register a new user
// ─────────────────────────────────────────
describe("User Registration", () => {
  test("Should register a new user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser1",
      email: "testuser1@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body.userId).toBeDefined();
  });

  test("Should fail registration with duplicate email", async () => {
    // Try to register same email again
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser1copy",
      email: "testuser1@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(500);
  });
});

// ─────────────────────────────────────────
// TEST 2: Login user
// ─────────────────────────────────────────
describe("User Login", () => {
  test("Should login successfully with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser1@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toBe("testuser1");
  });

  test("Should fail login with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser1@test.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  test("Should fail login with non-existent email", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "nobody@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });
});

// ─────────────────────────────────────────
// TEST 3: Password hashing
// ─────────────────────────────────────────
describe("Password Hashing", () => {
  test("Should correctly hash and verify a password", async () => {
    const password = "mySecurePassword";
    const hashed = await bcrypt.hash(password, 10);

    // Hashed should not equal original
    expect(hashed).not.toBe(password);

    // bcrypt compare should return true
    const isMatch = await bcrypt.compare(password, hashed);
    expect(isMatch).toBe(true);
  });

  test("Should return false for wrong password comparison", async () => {
    const hashed = await bcrypt.hash("correctPassword", 10);
    const isMatch = await bcrypt.compare("wrongPassword", hashed);
    expect(isMatch).toBe(false);
  });
});

// ─────────────────────────────────────────
// TEST 4: JWT Token Generation
// ─────────────────────────────────────────
describe("JWT Token", () => {
  test("Should generate a valid JWT token", () => {
    const payload = { id: "123", role: "user" };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    expect(token).toBeDefined();

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded.id).toBe("123");
    expect(decoded.role).toBe("user");
  });

  test("Should fail verification with wrong secret", () => {
    const token = jwt.sign({ id: "123" }, process.env.JWT_SECRET);
    expect(() => {
      jwt.verify(token, "wrongsecret");
    }).toThrow();
  });
});

// ─────────────────────────────────────────
// TEST 5: Search Destinations
// ─────────────────────────────────────────
describe("Search Destinations", () => {
  test("Should return results for valid search query", async () => {
    const res = await request(app).get("/api/search?query=Paris");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].name).toBe("Paris");
  });

  test("Should return empty array for unknown destination", async () => {
    const res = await request(app).get("/api/search?query=UnknownPlace123");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(0);
  });
});

// ─────────────────────────────────────────
// TEST 6: Profile Save
// ─────────────────────────────────────────
describe("User Profile", () => {
  test("Should save a user profile successfully", async () => {
    // First register a user to get an ID
    const registerRes = await request(app).post("/api/auth/register").send({
      username: "testuser2",
      email: "testuser2@test.com",
      password: "password123",
    });

    const userId = registerRes.body.userId;

    const res = await request(app).post("/api/profile").send({
      user_id: userId,
      full_name: "Test User",
      preferred_destination: "Paris",
      budget_range: "medium",
      travel_style: "luxury",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Profile saved successfully");
  });

  test("Should fetch an existing profile", async () => {
    // Register another user
    const registerRes = await request(app).post("/api/auth/register").send({
      username: "testuser3",
      email: "testuser3@test.com",
      password: "password123",
    });

    const userId = registerRes.body.userId;

    // Save profile first
    await request(app).post("/api/profile").send({
      user_id: userId,
      full_name: "Test User Three",
      preferred_destination: "Tokyo",
      budget_range: "high",
      travel_style: "corporate",
    });

    // Now fetch it
    const res = await request(app).get(`/api/profile/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.full_name).toBe("Test User Three");
    expect(res.body.preferred_destination).toBe("Tokyo");
  });

  // ─────────────────────────────────────────
  // TEST 7: Create Itinerary
  // ─────────────────────────────────────────
  describe("Itinerary", () => {
    let testUserId;

    beforeAll(async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "itinuser",
        email: "itinuser@test.com",
        password: "pass123",
      });
      testUserId = res.body.userId;
    });

    test("Should create a new itinerary", async () => {
      const res = await request(app).post("/api/itinerary").send({
        user_id: testUserId,
        title: "Paris Trip",
        destination: "Paris",
        start_date: "2025-06-01",
        end_date: "2025-06-07",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Itinerary created successfully");
      expect(res.body.itinerary.title).toBe("Paris Trip");
    });

    test("Should fetch itineraries for a user", async () => {
      const res = await request(app).get(`/api/itinerary/${testUserId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // ─────────────────────────────────────────
  // TEST 8: Travel Alerts
  // ─────────────────────────────────────────
  describe("Travel Alerts", () => {
    let testUserId;

    beforeAll(async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "alertuser",
        email: "alertuser@test.com",
        password: "pass123",
      });
      testUserId = res.body.userId;
    });

    test("Should create a travel alert", async () => {
      const res = await request(app)
        .post("/api/alerts")
        .send({ user_id: testUserId, destination: "Tokyo", max_price: 1500 });
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Alert created successfully");
      expect(res.body.alert.destination).toBe("Tokyo");
    });

    test("Should fetch alerts for a user", async () => {
      const res = await request(app).get(`/api/alerts/${testUserId}`);
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });

    test("Should delete a travel alert", async () => {
      const createRes = await request(app)
        .post("/api/alerts")
        .send({ user_id: testUserId, destination: "Bali", max_price: 800 });
      const alertId = createRes.body.alert._id;
      const deleteRes = await request(app).delete(`/api/alerts/${alertId}`);
      expect(deleteRes.statusCode).toBe(200);
      expect(deleteRes.body.message).toBe("Alert deleted successfully");
    });
  });
});
