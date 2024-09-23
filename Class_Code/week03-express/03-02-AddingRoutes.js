const express = require("express");
const app = express();
const PORT = 8000;

// home page
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

//about
app.get("/about", (req, res) => {
  res.send("Welcome to the about page");
});

// contact
app.get("/contact", (req, res) => {
  res.send("Welcome to contact");
});

// getdata
app.get("/getdata", (req, res) => {
  res.send("data here");
});

//login -> GET and POST
app.get("/login", (req, res) => {
  res.send("login page");
});

app.post("/login", (req, res) => {
  res.send("login page");
});

// catch all route, Please, put this at the buttom otherwise you block the other routes
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
