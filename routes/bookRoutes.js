const express = require('express');
const router = express.Router(); // Create a new router instance

// Import authentication middleware to protect certain routes
const auth = require('../middlewares/authMiddleware');

// Import controller functions for book operations
const {
  addBook,
  getBooks,
  getBookById,
  searchBooks,
} = require('../controllers/bookController');

// Route to add a new book (protected - requires authentication)
router.post('/books', auth, addBook);

// Route to get a list of books (supports pagination and filtering)
router.get('/books', getBooks);

// Route to get a single book by its ID (also populates reviews)
router.get('/books/:id', getBookById);

// Route to search books by title or author
router.get('/search', searchBooks);

// Export the router to be used in the main app
module.exports = router;
