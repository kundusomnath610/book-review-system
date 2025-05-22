const jwt = require('jsonwebtoken'); // Import the JSON Web Token library

// Middleware function to authenticate requests using JWT
const auth = (req, res, next) => {
  // Extract the token from the Authorization header ("Bearer <token>")
  const token = req.headers.authorization?.split(" ")[1];

  // If token is not provided, return 401 Unauthorized
  if (!token) return res.status(401).json({ message: "Unauthorized User, User should Login First" });

  try {
    // Verify the token using the secret key and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload (e.g., user info) to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (e) {
    // If token is invalid or verification fails, return 401 Unauthorized
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth; // Export the middleware for use in protected routes
