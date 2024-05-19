const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const cors = require("cors");
const sessionSecret = process.env.SESSION_SECRET;
const bcrypt = require("bcryptjs");
const MongoStore = require("connect-mongo");
const Schema = mongoose.Schema;
const nodemailer = require("nodemailer");
const crypto = require('crypto');  // For generating OTP




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
const UserSkill = mongoose.connection.collection("USER_Skill");



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

const generateOtp = () => {
  // Generate a random number between 0 and 9999, then pad it to ensure it's always 4 digits
  const otp = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return otp;
};

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

    if (PASSWORD !== user.PASSWORD) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate a 4-digit OTP
    const otp = generateOtp();
    await User.updateOne({ _id: user._id }, { $set: { otp } }); // Update OTP in user's document
    await sendOtpEmail(EMAIL, otp); // Send the OTP via email

    res.json({
      message: "OTP sent to your email. Please verify to complete login.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


app.post("/verify-login-otp", async (req, res) => {
  const { EMAIL, otp } = req.body;

  try {
    const user = await User.findOne({ EMAIL, otp });
    if (!user) {
      return res.status(404).json({ message: "Invalid OTP or Email" });
    }

    // Clear the OTP from the database after successful verification
    await User.updateOne({ _id: user._id }, { $unset: { otp: "" } });

    // Save user information in the session
    req.session.user = { id: user._id, email: EMAIL };
    req.session.save();

    res.json({ message: "Login successful", sessionID: req.sessionID });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server Error" });
  }
});



// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "52130469@students.liu.edu.lb", // Use environment variables in production
    pass: process.env.OTP_EMAIL_PASS, // Use environment variables in production
  },
}); 

// Helper function to send OTP
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: "52130469@students.liu.edu.lb",
    to: email,
    subject: "Verify Your Account",
    text: `Your OTP for account verification is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to " + email);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

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

    const otp = generateOtp(); // Generate a 4-digit OTP as a string
    const newUser = { EMAIL, PASSWORD, otp, verified: false };
    await User.insertOne(newUser); // Assuming User is a direct MongoDB collection access
    await sendOtpEmail(EMAIL, otp); // Send OTP email

    res
      .status(201)
      .json({ message: "Registration successful, verify your email" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


app.post("/verify-otp", async (req, res) => {
  const { EMAIL, otp } = req.body;

  try {
    const user = await User.findOne({ EMAIL, otp }); // Direct string comparison
    if (!user) {
      return res.status(404).json({ message: "Invalid OTP or Email" });
    }

    await User.updateOne({ _id: user._id }, { $set: { verified: true } });
    res.json({ message: "Account verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// // Registration route
// app.post("/register", async (req, res) => {
//   const { EMAIL, PASSWORD } = req.body;
//   if (!EMAIL || !PASSWORD) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const existingUser = await User.findOne({ EMAIL });
//     if (existingUser) {
//       return res
//         .status(409)
//         .json({ message: "User already exists with this email" });
//     }

//     const newUser = { EMAIL, PASSWORD };
//     await User.insertOne(newUser);

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

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
