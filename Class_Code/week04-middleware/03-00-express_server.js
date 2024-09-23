const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {  
  res.send("hello world");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/register", (req, res) => {
  res.send("register");
});

app.get("/login", (req, res) => {
  res.send("login");
});

app.get("/logout", (req, res) => {
  res.send("logout");
});

app.use((req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(PORT, () => {
  console.log(`open to http://127.0.0.1:${PORT}`);
});
