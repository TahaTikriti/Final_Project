const mongoose = require("mongoose");

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // Add more fields as needed
});

// Define User model
const User = mongoose.model("USER", userSchema);

// Method to fetch user by name
async function getUserByName(name) {
  try {
    // Find a user with the provided name
    const user = await User.findOne({ name });
    return user;
  } catch (error) {
    // Handle errors
    console.error(error);
    throw new Error("Error fetching user by name");
  }
}

module.exports = {
  getUserByName,
};
