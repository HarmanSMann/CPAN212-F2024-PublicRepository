// controllers/bookController.js
const Book = require("../models/book");

exports.getBooksByUser = async (req, res) => {
  try {
    const books = await Book.find({ created_by_user: req.session.userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { title, author, publishers, genres, price, pages } = req.body;

    const newBook = new Book({
      title,
      author,
      publishers,
      genres,
      price,
      pages,
      created_by_user: req.session.userId || undefined,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(400).json({ message: "Error adding book", error });
  }
};

exports.editBook = async (req, res) => {
  try {
    const { title, author, publishers, genres, price, pages } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishers, genres, price, pages },
      { new: true }
    );
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: "Error updating book", error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book details", error });
  }
};
