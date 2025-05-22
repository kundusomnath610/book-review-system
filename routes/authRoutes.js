const express = require('express');
const router = express.Router(); // Create a new router instance

// Import controller functions for authentication
const { signup, login } = require('../controllers/authController');

// Route to handle user signup (register new user)
router.post('/signup', signup);

// Route to handle user login (authenticate user and return JWT)
router.post('/login', login);

// Export the router to be used in the main app
module.exports = router;