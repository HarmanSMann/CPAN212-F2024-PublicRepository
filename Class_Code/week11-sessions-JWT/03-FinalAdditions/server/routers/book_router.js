const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const verifyToken = require("../middleware/verifyToken");

router.get("/fetch-all", verifyToken, (req, res) => {
  Book.find({ created_by: req.userId }, { title: 1, author: 1, price: 1 })
    .then((books) => {
      res.json(books); // Return the fetched books as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

router.get("/fetch-filter", (req, res) => {
  let filters = {}; // Create an empty object to later append any new responses

  // Check for title, author, pages, and genres
  if (req.query.title) {
    filters.title = req.query.title;
  }
  if (req.query.author) {
    // Fixed typo from 'auhtor' to 'author'
    filters.author = req.query.author;
  }
  if (req.query.pages) {
    filters.pages = req.query.pages;
  }
  if (req.query.genres) {
    filters.genres = req.query.genres;
  }

  // Check for date_created with switch statement
  if (req.query.date_created) {
    switch (req.query.date_range) {
      case "lt":
        filters.year = { $lt: parseFloat(req.query.date_created) };
        break;
      case "gt":
        filters.year = { $gt: parseFloat(req.query.date_created) };
        break;
      case "lte":
        filters.year = { $lte: parseFloat(req.query.date_created) };
        break;
      case "gte":
        filters.year = { $gte: parseFloat(req.query.date_created) };
        break;
      default:
        filters.year = parseFloat(req.query.date_created);
        break; // If date_range doesn't match any case, do nothing
    }
  }

  console.log("Filter: ");
  console.log(filters);

  Book.find(filters)
    .then((books) => {
      res.json(books); // Return the fetched books as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

router.get("/details/:id", (req, res) => {
  const bookId = req.params.id;
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);

  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).send({ message: "Book not found" });
      }
      res.json(book);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.put("/edit/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, author, pages, publisher, genres, price } = req.body;

  try {
    // Find the book by ID and update the fields
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        pages,
        publisher,
        genres,
        price,
      },
      { new: true } // Return the updated book
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);  // Send the updated book as the response
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/add-book", verifyToken, async (req, res) => {
  const { title, author, genres, publisher } = req.body;
  let pages = parseInt(req.body.pages)
  let price = parseFloat(req.body.price)

  // Create a new book instance
  const newBook = new Book({
    title,
    author,
    pages,
    genres,
    publisher,
    price,
    created_by: req.userId
  });
  console.log(newBook)
  newBook
    .save()
    .then((savedBook) => {
      res.status(201).json(savedBook);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/delete-book/:id", verifyToken, async (req, res) => {
  const bookId = req.params.id; // Corrected the param to be bookId
  const userId = req.userId; // User ID from the JWT token (set by the verifyToken middleware)

  try {
    // Find the book by its ID
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    // Check if the logged-in user is the creator of the book
    if (book.created_by.toString() !== userId.toString()) {
      return res.status(403).send({ message: "You are not authorized to delete this book" });
    }

    // If user is authorized, delete the book
    await Book.deleteOne({ _id: bookId });

    res.status(200).send({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;
