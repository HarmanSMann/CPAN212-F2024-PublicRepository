// const express = require("express");
// const mongoose = require("mongoose");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// dotenv.config();

// // Import routers
// const bookRouter = require("./routes/book_router");
// const userRouter = require("./routes/user_router");
// app.use(express.static(path.join(__dirname, "pages")));

// // Initialize app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Session setup
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       collectionName: "sessions",
//       ttl: 1000 * 60 * 60 * 24,
//     }),
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//   })
// );

// // Routes
// app.use("/api/books", bookRouter);
// app.use("/api/users", userRouter);

// // Static HTML routes
// app.get("/", (req, res) => {
//   res.send("Hi there");
// });
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "pages/index.html"));
// });

// app.get("/books/all", (req, res) => {
//   res.sendFile(path.join(__dirname, "pages/allBooks.html"));
// });

// app.get("/books/add", (req, res) => {
//   res.sendFile(path.join(__dirname, "pages/addBook.html"));
// });

// app.get("/books/edit/:id", (req, res) => {
//   res.sendFile(path.join(__dirname, "pages/editBook.html"));
// });

// app.get("/books/:id", (req, res) => {
//   res.sendFile(path.join(__dirname, "pages/bookDetail.html"));
// });

// // Register and Login pages
// app.get("/register", (req, res) => {
//   res.sendFile(path.join(__dirname, "pages/register.html"));
// });

// app.get("/login", (req, res) => {
//   res.sendFile(path.join(__dirname, "pages/login.html"));
// });

// // 404 page
// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "pages/404.html"));
// });

// // Database connection
// mongoose.connect(process.env.MONGO_URI);

// const db = mongoose.connection;

// db.once("open", () => {
//   // Check connection
//   console.log("Connected to MongoDB");
// });

// db.on("error", (err) => {
//   // Check for DB errors
//   console.log("DB Error");
// });

// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );
// module.exports = app;

const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
