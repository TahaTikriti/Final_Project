const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const crypto = require("crypto");
const sessionSecret = process.env.SESSION_SECRET 
const bcrypt = require("bcryptjs");


const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  dbName: "tutoring1",
});

const User = mongoose.connection.collection("USER");
const Skill = mongoose.connection.collection("SKILL");

app.use(express.json());

// Configure express-session middleware
app.use(
  session({
    secret: sessionSecret, // Replace with a real, secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60 * 60 * 1000 }, // Set to true if the app runs on HTTPS
  })
);

// Route to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().toArray();
    res.json(users);
  } catch (error) {
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

    const users = await User.find({
      name: { $regex: `^${name}`, $options: "i" },
    }).toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found with the given name prefix" });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// Modified login route with bcrypt for password hashing and session management
app.post("/login", async (req, res) => {
  try {
    const { EMAIL, PASSWORD } = req.body;
    if (!EMAIL || !PASSWORD) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ EMAIL });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(PASSWORD, user.PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Save user information in the session
    req.session.user = { id: user._id, email: EMAIL };
    res.json({ message: "Login successful", sessionID: req.sessionID });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
// Registration route
app.post("/register", async (req, res) => {
  const { EMAIL, PASSWORD } = req.body;
  if (!EMAIL || !PASSWORD) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ EMAIL });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email" });
    }

    const newUser = { EMAIL, PASSWORD };
    await User.insertOne(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to search users by location
app.get("/searchbylocation", async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: "Location parameter is required" });
    }

    const usersCursor = await User.find({
      LOCATION: { $regex: location, $options: "i" },
    });

    const users = await usersCursor.toArray();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found at the given location" });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to search users by university
app.get("/searchbyuni", async (req, res) => {
  try {
    const { uni } = req.query;
    if (!uni) {
      return res.status(400).json({ message: "University name parameter is required" });
    }

    const usersCursor = await User.find({
      UNIVERSITY_NAME: { $regex: uni, $options: "i" },
    });

    const users = await usersCursor.toArray();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found for the given university name" });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to search skills by name
app.get("/searchbyskill", async (req, res) => {
  try {
    const { skillname } = req.query;
    if (!skillname) {
      return res.status(400).json({ message: "Skill name parameter is required" });
    }

    const skills = await Skill.find({
      SKILL_NAME: { $regex: `^${skillname}`, $options: "i" },
    }).toArray();

    if (skills.length === 0) {
      return res.status(404).json({ message: "No skills found with the given name" });
    }

    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to fetch all skills
app.get("/getskills", async (req, res) => {
  try {
    const skills = await Skill.find().toArray();
    res.json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
