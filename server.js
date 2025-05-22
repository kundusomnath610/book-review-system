const express = require('express'); // Import Express framework for building the API server
const mongoose = require('mongoose'); // Import Mongoose for MongoDB connection and modeling
const dotenv = require('dotenv'); // Import dotenv to load environment variables from .env file

dotenv.config(); // Load environment variables from .env into process.env

const app = express(); // Create an Express application instance

app.use(express.json()); 
// Middleware to parse incoming JSON requests and make the data available on req.body

// Import route modules to handle authentication, books, and reviews
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Mount the route modules on the '/api' base path
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);

// Connect to MongoDB database using the connection string from environment variables
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,    // Use new URL parser for MongoDB connection string
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
}).then(() => {
  // Start the Express server only after successful database connection
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
