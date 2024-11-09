require("dotenv").config();
const PORT = process.env.PORT || 8000;
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

// Implementing Sessions
const session = require("express-session"); //new
const MongoStore = require("connect-mongo"); //new

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_KEY,
      collectionName: "sessions",
      ttl: 1000 * 60 * 60 * 24, // this is time in seconds -> so 5 seconds (ttl: time to live)
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // maxAge: 1000 * 60 * 60 * 24 1 day
  })
);

// MongoDB
mongoose
  .connect(process.env.MONGODB_KEY)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("DB Error:", err));

// Importing Routers
const book_router = require("./routers/book_router");
const user_router = require("./routers/user_router");

// routes
app.use("/book", book_router);
app.use("/user", user_router);

app.get("/test-session", (req, res) => {
  console.log(req.session)
  if (req.session.views) {
    req.session.views++;
    res.setHeader("Content-Type", "text/html");
    res.write("<p>Views: " + req.session.views + "</p>");
    res.end();
  } else {
    req.session.views = 1;
    res.end("Welcome to the session demo. Refresh!");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
