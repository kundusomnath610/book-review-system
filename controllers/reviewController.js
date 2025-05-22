const Review = require('../models/Review'); // Import the Review model
const Book = require('../models/Book');     // Import the Book model

// Controller to add a review for a book
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;      // Extract rating and comment from request body
  const bookId = req.params.id;              // Extract book ID from route parameters

  // Check if the user has already reviewed the book
  const existing = await Review.findOne({ book: bookId, user: req.user.id });
  if (existing) return res.status(400).json({ message: "Already reviewed" });

  // Create and save a new review
  const review = new Review({ book: bookId, user: req.user.id, rating, comment });
  await review.save();

  // Add the review's ID to the book's `reviews` array
  await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

  // Return the newly created review
  res.status(201).json(review);
};

// Controller to update an existing review
exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id); // Find the review by its ID

  // Check if the review exists and belongs to the logged-in user
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  // Merge request body into the existing review object
  Object.assign(review, req.body);

  // Save the updated review
  await review.save();

  // Return the updated review
  res.json(review);
};

// Controller to delete a review
exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id); // Find the review by ID

  // Check if the review exists and is owned by the current user
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  // Delete the review from the database
  await Review.findByIdAndDelete(req.params.id);

  // Remove the review reference from the associated book's `reviews` array
  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });

  // Send confirmation message
  res.json({ message: "Review deleted" });
};
