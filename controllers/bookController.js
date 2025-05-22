const Book = require('../models/Book');

// Controller to add a new book to the database
exports.addBook = async (req, res) => {
  const book = new Book(req.body); // Create a new Book instance using the request body
  await book.save(); // Save the book to the database
  res.status(201).json(book); // Return the created book with status 201 (Created)
};

// Controller to get a list of books with optional pagination and filtering by author or genre
exports.getBooks = async (req, res) => {
  // Destructure query parameters with default values
  const { page = 1, limit = 10, author, genre } = req.query;
  
  // Initialize query object
  const query = {};
  
  // Add case-insensitive regex-based filtering for author and genre
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = new RegExp(genre, 'i');

  // Fetch books based on query, skip and limit for pagination
  const books = await Book.find(query)
    .skip((page - 1) * limit) // Skip documents based on current page
    .limit(Number(limit)); // Limit number of results per page

  res.json(books);

  // Optional: Return 400 if no filters are provided (commented out logic)
  // if (!author || !genre) {
  //   return res.status(400).json({message: 'Parameter Not Found!!'});
  // }
  
};

// Controller to get a single book by its ID, including populated review data and average rating
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('reviews'); // Fetch book and populate reviews
  if (!book) return res.status(404).json({ message: "Book not found" }); // Handle case where book is not found

  // Calculate average rating from reviews
  const avgRating = book.reviews.length
    ? book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length
    : 0;

  // Send book details along with computed average rating
  res.json({ ...book.toObject(), avgRating });
};

// Controller to search for books by title or author
exports.searchBooks = async (req, res) => {
  const { title, author } = req.query;

  // Build search query using case-insensitive regex
  const query = {};
  if (title) query.title = new RegExp(title, 'i');
  if (author) query.author = new RegExp(author, 'i');

  // Validate that at least one search parameter is provided
  if (!title && !author) {
    return res.status(400).json({ message: 'Missing search parameters' });
  }

  const books = await Book.find(query); // Search books by title and/or author

  // Handle no match found case
  if (!books.length) {
    return res.status(404).json({ message: 'No books found matching the search criteria' });
  }

  res.json(books); // Return matching books
};
