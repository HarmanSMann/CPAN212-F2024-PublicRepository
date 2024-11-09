/*
    Now we need to encrypt the password
    Register needs to be updated
    Login needs to be updated

*/

const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Secret key for JWT


router.post("/register", (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hashedPassword) => {
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });

      return newUser.save(); // Save the new user to the database
    })
    .then((result) => {
      res.status(201).json({message: "Account Created"});
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Error registering user");
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user_account) => {
      if (!user_account) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      bcrypt
        .compare(password, user_account.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
          }

          // Generate JWT token
          const token = jwt.sign(
            { userId: user_account._id, email: user_account.email },
            JWT_SECRET,
            { expiresIn: "1h" } // The token expires in 1 hour
          );

          return res.status(200).json({
            message: "Login Successful",
            token: token, // Send the JWT token in the response
          });
        })
        .catch((error) => {
          console.error("Error during password comparison: ", error);
          return res.status(500).json({ error: "Server error" });
        });
    })
    .catch((error) => {
      console.error("Error during login: ", error);
      return res.status(500).json({ error: "Server error" });
    });
});

router.get("/search", (req, res) => {
  let filters = {};
  if (req.body.first_Name) {
    filters.first_name = req.body.first_Name;
  }
  if (req.body.last_Name) {
    filters.last_name = req.body.last_Name;
  }
  User.find(filters)
    .then((results) => {
      res.json(results);
    })
    .catch((error) => {
      console.error("Error Finding Users. Error: ", error);
      return res.status(500).json({ error: "Server error" });
    });
});

router.get("/profile/:user_id", (req, res) => {
  const userId = req.params.user_id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;
