const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken');   // Import JSON Web Token for authentication

// Controller to handle user signup (registration)
exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);  // Create a new user instance from request body
    await user.save();                // Save the user to the database
    res.status(201).json({ message: "User created" }); // Respond with success message
  } catch (err) {
    // Handle validation or database errors
    res.status(400).json({ error: err.message });
  }
};

// Controller to handle user login
exports.login = async (req, res) => {
  const { username, password } = req.body; // Destructure username and password from request body

  // Find the user by username
  const user = await User.findOne({ username });

  // If user not found or password doesn't match, return 401 Unauthorized
  if (!user || !(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid credentials" });

  // Generate a JWT using the user's ID and a secret key from environment variables
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // Return the token to the client
  res.json({ token });
};
