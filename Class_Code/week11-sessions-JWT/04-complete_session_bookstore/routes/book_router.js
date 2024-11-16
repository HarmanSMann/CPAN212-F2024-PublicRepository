// routes/bookRouter.js
const express = require("express");
const bookController = require("../controllers/book_controller");
const router = express.Router();

// Fetch books by the logged-in user (JSON response)
router.get("/", bookController.getBooksByUser);

// Fetch all books (JSON response)
router.get("/all", bookController.getAllBooks);

// Add book (POST request)
router.post("/add", bookController.addBook);

// Edit book (POST request)
router.post("/edit/:id", bookController.editBook);

// Delete book route
router.post("/delete/:id", bookController.deleteBook);

// Fetch detailed book information (JSON response)
router.get("/details/:id", bookController.getBookDetails);

module.exports = router;
