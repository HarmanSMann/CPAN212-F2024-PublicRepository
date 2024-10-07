// integration with multer
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");
const { body, validationResult } = require("express-validator");

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

// we check for: first_name, username, email, password
app.post(
  "/register",
  [
    body("first_name").notEmpty().withMessage("First Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please Enter a valid Email Adress"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 5 })
      .withMessage("Password should be atleast 5 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(req.body.first_name);
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send(req.body);
  }
);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
