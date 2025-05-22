const express = require('express');
const router = express.Router(); // Create a new Express router

// Import authentication middleware to protect review routes
const auth = require('../middlewares/authMiddleware');

// Import controller functions for review-related operations
const {
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

// Route to add a review to a specific book (authentication required)
router.post('/books/:id/reviews', auth, addReview);

// Route to update an existing review by its ID (authentication required)
router.put('/reviews/:id', auth, updateReview);

// Route to delete a review by its ID (authentication required)
router.delete('/reviews/:id', auth, deleteReview);

// Export the router to be used in the main app
module.exports = router;

