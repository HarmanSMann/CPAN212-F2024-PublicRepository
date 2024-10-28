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

const connectDB = require("./config/db_config") // import mongoDB

connectDB();

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
