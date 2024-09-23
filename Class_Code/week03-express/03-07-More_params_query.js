const express = require("express");
const app = express();

app.get("/flights/:from-:to", (req, res) => {
  res.send(req.params);
});

app.get("/users/:userId/books/:bookId", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

// http://localhost:8000/login?username=01&password=password01
app.get("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  if (username && password) {
    res.status(200).json({
      success: true,
      message: `Login successful, Hello ${username}`,
    });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Invalid username or password" });
  }
});

// multiple callbacks
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

app.listen(8000, function () {
  console.log("Example app listening on port 3000!");
});
