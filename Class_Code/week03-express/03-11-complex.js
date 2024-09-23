const express = require("express");
const app = express();

// app.use(express.json());

// This path will match abcd, abbcd, abbbcd, etc.
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});

// This path will match abcd, abxcd, abANYTHINGcd, ab123cd
// requires starting with ab and ending with cd
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});

// Will match /abe and /abcde. Bracket content optional
app.get("/ab(cd)?e", (req, res) => {
  res.send("ab(cd)?e");
});

// Regex path that will match anything with 'a'
app.get(/a/, (req, res) => {
  res.send("/a/");
});

// Regex path that matches anything that ends with fly
app.get(/.*fly$/, (req, res) => {
  res.send("/.*fly$/");
});

// Named parameters to get user and book ids
// Uses : followed by variable name
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(req.params);
});

// Hyphen is used literally so can be used to
// separate parameters
app.get("/flights/:from-:to", (req, res) => {
  res.send(req.params);
});

// Multiple callback functions for route requires using next
app.get(
  "/b",
  (req, res, next) => {
    console.log("Response is sent by the next function");
    next();
  },
  (req, res) => {
    res.send("Hello from B!");
  }
);

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});