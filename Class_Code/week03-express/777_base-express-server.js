// this will be our base server file throughout the course now. Kind of a quick file for you to start with for classes
const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;

// Enabling middleware
app.use(express.urlencoded({ extended: true }));

// Endpoints here, with home and login as examples
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app
  .get("/login", (req, res) => {
    res.send("Welcome to the Login Page");
  })
  .post("/login", (req, res) => {
    console.log(req.body);
    res.send("I have recieved your request");
  });

// catch all route
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Go to: http://127.0.0.1:${PORT}`);
});
