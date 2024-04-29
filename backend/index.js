const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");




const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: "tutoring1",
});

// Get a reference to the USER collection
const User = mongoose.connection.collection("USER");

// Middleware to parse JSON requests
app.use(express.json());

// Route to fetch all users
app.get("/users", async (req, res) => {
  try {
    // Fetch all documents from the USER collection
    const users = await User.find().toArray();
    res.json(users);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to search user by name
app.get("/searchbyname", async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: "Name parameter is required" });
    }
    // Find user by name
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// Route for user login
app.post("/login", async (req, res) => {
  try {
    const { EMAIL, PASSWORD } = req.body;
    // Check if email and password are provided
    if (!EMAIL || !PASSWORD) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ EMAIL });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the user's password
    if (user.PASSWORD !== PASSWORD) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Authentication successful, you can generate a token or set a session here
    // For now, let's send a success response
    res.json({ message: "Login successful" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


app.post("/register", async (req, res) => {
  const { EMAIL, PASSWORD } = req.body;

  // Check if email and password are provided
  if (!EMAIL || !PASSWORD) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ EMAIL });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // Create a new user if not existing
    const newUser = {
      EMAIL,
      PASSWORD, // In production, you should hash the password before storing it
    };

    // Insert the new user into the USER collection
    await User.insertOne(newUser);

    // Respond with success if the user is registered
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
