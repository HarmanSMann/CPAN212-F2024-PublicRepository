const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// 1. Synchronous Fixes (Using callbacks) - THIS is old
router.get("/fetch-all", (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(books);
  });
});

router.get("/fetch-all-try", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books); // Return the fetched books as JSON
  } catch (err) {
    res.status(500).send(err); // Handle error
  }
});

// 2. Promises
router.get("/fetch-all-promises", (req, res) => {
  Book.find({}, { title: 1, author: 1, pages: 1 })
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

router.post("/save-book", async (req, res) => {
  const { title, author, pages, genres } = req.body;
  console.log(req.body);

  // Create a new book instance
  const newBook = new Book({
    title,
    author,
    pages,
    genres,
  });

  newBook
    .save()
    .then((savedBook) => {
      res.status(201).json(savedBook);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/delete-book", (req, res) => {
  const bookId = req.body._id;

  Book.deleteOne({ _id: bookId })
    .then((result) => {
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Book not found" });
      }
      res.status(200).send({ message: "Book deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send(err); // Handle any errors
    });
});

router.get("/book/:id", (req, res) => {
  const bookId = req.params.id;

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

module.exports = router;
