const mongoose = require("mongoose");

// Define the schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
  date_created: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

// Create the model
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
