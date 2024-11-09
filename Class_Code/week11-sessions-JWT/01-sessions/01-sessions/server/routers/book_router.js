const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/fetch-all", (req, res) => {
  Book.find({},{title:1, author:1, price:1})
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
  console.log(req.params)
  console.log(req.query)
  console.log(req.body)

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

router.post("/add-book", async (req, res) => {
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



module.exports = router;
