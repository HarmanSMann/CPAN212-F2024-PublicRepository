/*
    What do we want to do with the user data?
        1 - Make users
        2 - Let users login
        3 - Search for users
        4 - Delete User accounts?
        5 - Update User account
        6 - Profile

*/

const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", (req, res) => {});
router.post("/login", (req, res) => {});
router.get("/search", (req, res) => {});
router.delete("/delete_user", (req, res) => {});
router.put("/update_user", (req, res) => {});
router.get("/profile:user_id", (req, res) => {});

module.exports = router;
