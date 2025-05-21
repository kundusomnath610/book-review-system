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
  if (genre) query.genre = genre;

  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(books);
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
  const { q } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(q, 'i') },
      { author: new RegExp(q, 'i') },
    ],
  });
  res.json(books);
};
