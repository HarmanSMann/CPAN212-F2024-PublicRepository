/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon mongoose
*/

const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const connectDB = require("./config/db_config"); // import mongoDB
const Book = require("./model/book");

connectDB();

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", async (req, res) => {
  try {
    // const books = await Book.find(); // Fetch all books from the database
    const books = await Book.find(
      { title: "To Kill a Mockingbird" },
      { _id: 1, title: 1, author: 1 }
    ); // Fetch a specific book title, and only send me data for id, title, author
    res.json(books); // Send the books as JSON
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Server error");
  }
});

//---------------------------------------------------------------------------------------------
// with promises -> personal preference to using this
app.get("/promise", function (req, res) {
  Book.find({})
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
//---------------------------------------------------------------------------------------------

// Trying a search query and how you can encorporate what you learnt before -> THIS WOULD BE REPLACED WITH REACT, this is just an in class example
app.get("/search", async (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bookstore Search</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      background-color: #f4f4f4;
    }
    .search-container {
      background: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
      width: 300px;
    }
    input[type="text"] {
      width: 100%;
      padding: 10px;
      margin-top: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      margin-top: 10px;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>

  <div class="search-container">
    <h2>Search for a Book</h2>
    <form id="searchForm" action="/searchpromise" method="POST">
      <input type="text" name="title" placeholder="Enter book title or author" required>
      <button type="submit">Search</button>
    </form>
  </div>

</body>
</html>
`);
});

app.post("/search", async (req, res) => {
  try {
    console.log(req.body);
    const books = await Book.find(
      { title: req.body.title },
      { _id: 1, title: 1, author: 1 }
    );
    res.json(books); // Send the books as JSON
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Server error");
  }
});

//---------------------------------------------------------------------------------------------
app.post("/searchpromise", async (req, res) => {
  Book.find({ title: req.body.title }, { _id: 1, title: 1, author: 1 })
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
//---------------------------------------------------------------------------------------------

// better version -> regex search to help with indentation
// app.post("/fetch_search", async (req, res) => {
//   try {
//     const searchQuery = req.body.query;
//     const books = await Book.find({
//       $or: [
//         { title: { $regex: searchQuery, $options: "i" } },
//         { author: { $regex: searchQuery, $options: "i" } }
//       ]
//     });
//     res.json(books); // Send the matching books as JSON
//   } catch (error) {
//     console.error("Error searching for books:", error);
//     res.status(500).send("Server error");
//   }
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
