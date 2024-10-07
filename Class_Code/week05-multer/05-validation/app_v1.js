// integration with multer
const PORT = process.env.PORT || 8000;
const express = require("express");
const app = express();
const path = require("path");
const { body, validationResult, check } = require("express-validator");

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
app.post("/register", async (req, res) => {
  await check("first_name", "first name input error").notEmpty().withMessage("Empty first name field").run(req);
  await check("username", "username error").notEmpty().withMessage("Empty username field").run(req);
  await check("email", "email is required/Invalid")
    .isEmail()
    .notEmpty()
    .run(req);
  await check("password", "Name is required")
    .isLength({ min: 5 })
    .withMessage("password needs atleast 5 characters")
    .notEmpty()
    .run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req.body.first_name);
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

app.use("", (req, res) => {
  res.status(404).send("Page not found");
});