// routes/book_router.js
const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const bookController = require('../controllers/book_controller'); // Import controller functions
const router = express.Router();

// Fetch all books for the logged-in user
router.get("/", verifyToken, bookController.getUserBooks);

// Fetch all books
router.get("/all", bookController.getAllBooks);

// Add a new book
router.post("/add", verifyToken, bookController.addBook);

// Edit an existing book
router.put("/edit/:id", verifyToken, bookController.editBook);

// Delete a book
router.delete("/delete/:id", verifyToken, bookController.deleteBook);

// Fetch detailed book information
router.get("/details/:id", bookController.getBookDetails);

module.exports = router;
