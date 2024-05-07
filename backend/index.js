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
app.get('/searchbyname', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ message: 'Name parameter is required' });
    }

    // Use a regex pattern to find users whose names contain the provided string, case-insensitive
    const users = await User.find({ name: { $regex: `^${name}`, $options: 'i' } }).toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found with the given name prefix' });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
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

// Assuming you're using an Express.js server and a User model imported properly
app.get('/searchbylocation', async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'Location parameter is required' });
    }

    // Search for users by location field, using case-insensitive search
    const usersCursor = await User.find({ LOCATION: { $regex: location, $options: 'i' } });

    // Convert cursor to an array
    const users = await usersCursor.toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found at the given location' });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/searchbyuni', async (req, res) => {
  try {
    const { uni } = req.query;
    if (!uni) {
      return res.status(400).json({ message: 'University name parameter is required' });
    }

    // Search for users by university name, using case-insensitive search
    const usersCursor = await User.find({ UNIVERSITY_NAME: { $regex: uni, $options: 'i' } });

    // Convert cursor to an array
    const users = await usersCursor.toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found for the given university name' });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
