const express = require("express");
const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  console.log(req);
  let message = ""
  if (req.query.video) {
    message += req.query.video
  }
  if (req.query.image) {
    message += req.query.image
  }

  res.send({message});
});

app.get("/itm/:item", (req, res) => {
  console.log(req);
  let message = req.params.item;
  res.send({message});
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
