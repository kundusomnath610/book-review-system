// Load environment variables from a .env file into process.env
require('dotenv').config();

const mongoose = require('mongoose'); // Import Mongoose for MongoDB connection

// Async function to connect to the MongoDB database
const connectDB = async () => {
  // Connect to MongoDB using the connection string from environment variables
  await mongoose.connect(process.env.MONGO_URI);

  // Log success message on successful connection
  console.log("MongoDB connected");
};

// Export the connectDB function so it can be used in other parts of the application
module.exports = connectDB;
