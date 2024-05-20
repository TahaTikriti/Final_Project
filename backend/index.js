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
    const { FULL_NAME } = req.query;
    if (!FULL_NAME) {
      return res.status(400).json({ message: "Name parameter is required" });
    }

    const users = await User.find({
      FULL_NAME: { $regex: `^${FULL_NAME}`, $options: "i" },
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

    // Check if the user's email has been verified
    if (!user.verified) {
      return res
        .status(403)
        .json({ message: "Please verify your email address first" });
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
  const { EMAIL, PASSWORD, FULL_NAME, UNIVERSITY_NAME, PHONE_NUMBER } = req.body;

  // Check if all required fields are present
  if (!EMAIL || !PASSWORD || !FULL_NAME || !UNIVERSITY_NAME || !PHONE_NUMBER) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ EMAIL });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    // Generate a one-time password (OTP)
    const otp = generateOtp(); // Assuming generateOtp() is defined to generate a 4-digit OTP as a string

    // Create new user object including phone number
    const newUser = {
      EMAIL,
      PASSWORD,
      FULL_NAME,
      UNIVERSITY_NAME,
      PHONE_NUMBER, // Add phone number to the new user object
      otp,
      verified: false
    };

    // Insert the new user into the database
    await User.insertOne(newUser); // Assuming User is a direct MongoDB collection access

    // Send OTP to user's email
    await sendOtpEmail(EMAIL, otp); // Assuming sendOtpEmail() is defined to send emails

    // Respond with success message
    res.status(201).json({ message: "Registration successful, verify your email" });
  } catch (error) {
    // Log and respond with error if something goes wrong
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
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
    
    // Save user information in the session
    req.session.user = { id: user._id, email: EMAIL };
    req.session.save();
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
      return res.status(400).json({ message: "Skill name parameter is required" });
    }

    console.log("Searching for skill:", skillname); // Debugging log

    // Search for users with the specified skill name in the "USER" collection
    const users = await User.find({
      "SKILLS.skill_name": { $regex: new RegExp(skillname, "i") }
    }).toArray();

    console.log("Users found:", users.length); // Debugging log

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found with the given skill" });
    }

    res.json(users);
  } catch (error) {
    console.error("Error encountered:", error); // More detailed error logging
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
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // ensure this directory is existent or handled dynamically
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Update profile route
// Assuming you are using Express and Mongoose
app.post("/update-profile", async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log(req.body);
  const userId = req.session.user.id; // Assuming this is how you store user IDs in the session
  const { BIO, LOCATION, skills } = req.body;

  let updates = { $set: {}, $push: {} };

  // Check each field explicitly to ensure it's not undefined, null, or an empty string
  if (typeof BIO === 'string' && BIO.trim() !== '') updates.$set.BIO = BIO;
  if (typeof LOCATION === 'string' && LOCATION.trim() !== '') updates.$set.LOCATION = LOCATION;
  
  if (Array.isArray(skills)) {
    // Filter out any skills that do not have both name and proficiency provided
    const filteredSkills = skills.filter(skill => skill.skillName && skill.skillProficiency);
    if (filteredSkills.length > 0) {
      updates.$push.SKILLS = { 
        $each: filteredSkills.map(skill => ({ skill_name: skill.skillName, proficiency: skill.skillProficiency }))
      };
    }
  }

  // Remove empty $set or $push objects to avoid sending an empty update
  if (Object.keys(updates.$set).length === 0) delete updates.$set;
  if (Object.keys(updates.$push).length === 0) delete updates.$push;

  // Ensure there's something to update
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "No valid update fields provided" });
  }

  try {
    // Execute the update operation with proper atomic operators
    await User.updateOne({ _id: new mongoose.Types.ObjectId(userId) }, updates);
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
