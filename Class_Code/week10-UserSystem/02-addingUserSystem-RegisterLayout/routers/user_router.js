/*
    What do we want to do with the user data?
        1 - Make users -> like save book
        2 - Let users login -> search for user, compare passwords, send them the results
        3 - Search for users
        4 - Profile

*/

const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", (req, res) => {
  const { email, password, first_Name, last_Name } = req.body;
  const newUser = new User({
    email,
    password,
    first_Name,
    last_Name,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user_account) => {
      if (user_account.password != password) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      return res.status(200).json({ message: "Login Successful" });
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
