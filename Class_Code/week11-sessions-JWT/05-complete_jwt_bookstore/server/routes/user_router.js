// routes/userRouter.js
const express = require('express');
const userController = require('../controllers/user_controller'); // Import the userController
const router = express.Router();

// Register route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

// Logout route
router.get('/logout', userController.logoutUser);

// Express route for checking the session
router.get('/session', userController.checkSession);

module.exports = router;
