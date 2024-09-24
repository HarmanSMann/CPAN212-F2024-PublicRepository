const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer")
const multer = require('multer');



router.post("/single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.path}`);
});

//multiple uploads
router.post("/multiple", upload.array("files", 20), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  const filePaths = req.files.map((file) => file.path);
  res.status(200).send(`Files uploaded successfully: ${filePaths.join(", ")}`);
});

module.exports = router;
