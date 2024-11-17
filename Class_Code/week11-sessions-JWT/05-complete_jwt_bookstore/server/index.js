const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

// Import routers
const bookRouter = require("./routes/book_router");
const userRouter = require("./routes/user_router");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRouter); // Protect book routes with JWT authentication
app.use("/api/users", userRouter);

// 404 page (API not found)
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.error("MongoDB connection error:", error));
