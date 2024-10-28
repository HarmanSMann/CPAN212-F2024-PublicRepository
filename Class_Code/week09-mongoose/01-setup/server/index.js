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

// adding our mongoDB database
const mongoose = require("mongoose"); // importing the dependancy
mongoose.connect("REPLACE WITH YOUR DATABASE STRING"); // establishing a connection -> connect command + an api string to connect to our database
// this does not keep the connection, only establishes where it will go to connect
const db = mongoose.connection; // saving the databse usecase into a variable

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

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
