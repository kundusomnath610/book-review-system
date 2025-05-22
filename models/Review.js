/*

Review schema for the Book, User, rating, And comment

*/

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

// Export the review model using the schema
module.exports = mongoose.model('Review', reviewSchema); 
