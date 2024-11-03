/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon mongoose dotenv
*/
require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();

// adding our mongoDB database
// importing the dependancy
const mongoose = require("mongoose");
// establishing a connection -> connect command + an api string to connect to our database
mongoose.connect(process.env.MONGODB_BOOKSTORE);
// this does not keep the connection, only establishes where it will go to connect
// saving the databse usecase into a variable
const db = mongoose.connection;

db.once("open", () => {
  // Check connection
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  // Check for DB errors
  console.log("DB Error");
});

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

const Book = require("./models/book");
// 1. Synchronous Fixes (Using callbacks) - THIS is old
app.get("/fetch-all", (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(books);
  });
});

app.get("/fetch-all-try", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books); // Return the fetched books as JSON
  } catch (err) {
    res.status(500).send(err); // Handle error
  }
});

// 2. Promises
app.get("/fetch-all-promises", (req, res) => {
  Book.find()
    .then((books) => {
      res.json(books); // Return the fetched books as JSON
    })
    .catch((err) => {
      res.status(500).send(err); // Handle error
    });
});

app.get("/fetch-filter", (req, res) => {
  let filters = {}; // Create an empty object to later append any new responses

  // Check for title, author, pages, and genres
  if (req.query.title) {
    filters.title = req.query.title;
  }
  if (req.query.author) { // Fixed typo from 'auhtor' to 'author'
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


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
