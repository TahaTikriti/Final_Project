const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const crypto = require("crypto");
const sessionSecret = process.env.SESSION_SECRET;
const bcrypt = require("bcryptjs");
const MongoStore = require("connect-mongo");
const Schema = mongoose.Schema;



const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"], // Replace with your frontend's origin
    credentials: true, // Crucial for cookies to be sent with requests
  })
);
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
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      secure: false, // Set to true if you're using https
      httpOnly: true,
      maxAge: 3600000, // 1 hour
    },
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
      return res
        .status(404)
        .json({ message: "No users found with the given name prefix" });
    }

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Modified login route without bcrypt for password hashing and session management
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

    // Compare the provided password with the password in the database
    if (PASSWORD !== user.PASSWORD) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Save user information in the session
    req.session.user = { id: user._id, email: EMAIL };
    req.session.save();
    //console.log("user" + JSON.stringify(req.session.user));
    //console.log(req.session);
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
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
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
      return res
        .status(400)
        .json({ message: "Location parameter is required" });
    }

    const usersCursor = await User.find({
      LOCATION: { $regex: location, $options: "i" },
    });

    const users = await usersCursor.toArray();
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found at the given location" });
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
      return res
        .status(400)
        .json({ message: "University name parameter is required" });
    }

    const usersCursor = await User.find({
      UNIVERSITY_NAME: { $regex: uni, $options: "i" },
    });

    const users = await usersCursor.toArray();
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "No users found for the given university name" });
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
      return res
        .status(400)
        .json({ message: "Skill name parameter is required" });
    }

    const skills = await Skill.find({
      SKILL_NAME: { $regex: `^${skillname}`, $options: "i" },
    }).toArray();

    if (skills.length === 0) {
      return res
        .status(404)
        .json({ message: "No skills found with the given name" });
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


// Route to fetch user data by user ID
app.get("/user/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(req.params.userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to fetch skills data by user ID
app.get("/user_skills/:userId", async (req, res) => {
  try {
    const skills = await Skill.find({ userId: new mongoose.Types.ObjectId(req.params.userId) }).toArray();
    if (!skills.length) {
      return res.status(404).json({ message: "Skills not found for the user" });
    }
    res.json({ skills });
  } catch (error) {
    console.error("Error fetching user skills:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Route to check if user is logged in
app.get("/session", (req, res) => {
 
  if (req.session.user) {
    res.json({ isAuthenticated: true, user: req.session.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});
// Logout route
app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Server Error" });
    } else {
      res.json({ message: "Logout successful" });
    }
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
