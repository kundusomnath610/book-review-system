const Review = require('../models/Review');
const Book = require('../models/Book');

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.id;
  const existing = await Review.findOne({ book: bookId, user: req.user.id });
  if (existing) return res.status(400).json({ message: "Already reviewed" });

  const review = new Review({ book: bookId, user: req.user.id, rating, comment });
  await review.save();

  await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await Review.findByIdAndDelete(req.params.id);
  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  res.json({ message: "Review deleted" });
};
