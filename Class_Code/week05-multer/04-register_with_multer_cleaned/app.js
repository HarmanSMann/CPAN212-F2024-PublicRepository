// integration with multer
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");

const upload = require("./middleware/multer")

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.post("/register", upload.single("file"), (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
