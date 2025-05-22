const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
};

exports.getBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = new RegExp(genre, 'i');


  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(books);

  // if (!author || !genre) {
  //   return res.status(400).json({message: 'Parameter Not Found!!'});
  // }
  
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('reviews');
  if (!book) return res.status(404).json({ message: "Book not found" });

  const avgRating = book.reviews.length
    ? book.reviews.reduce((acc, r) => acc + r.rating, 0) / book.reviews.length
    : 0;

  res.json({ ...book.toObject(), avgRating });
};

exports.searchBooks = async (req, res) => {
  const { title, author} = req.query;

  const query = {};
  if (title) query.title = new RegExp(title, 'i');
  if (author) query.author = new RegExp(author, 'i');

  if (!title && !author) {
    return res.status(400).json({ message: 'Missing search parameters' });
  }

  const books = await Book.find(query);

  if (!books.length) {
    return res.status(404).json({ message: 'No books found matching the search criteria' });
  }

  res.json(books);
};
