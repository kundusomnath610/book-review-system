/*
Define the mongoose schema for the book model.
*/

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String, // Title for the book..
  author: String, // Author for the book..
  genre: String, // Type of the book..

  // Array of review IDs referencing the Review model
  // This creates a one-to-many relationship between Book and Review

  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('Book', bookSchema); // Export the module.
