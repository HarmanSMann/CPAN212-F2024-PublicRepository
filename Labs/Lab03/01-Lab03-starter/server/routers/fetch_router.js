const express = require("express");
const router = express.Router();
const fs = require("fs")
const path = require("path")
const upload_directory = path.join(__dirname, "../uploads")
const _ = require("lodash");

router.get("/single", (req, res) => {
    // we read the directory items synchronously to not trip the async speed
    let files_array = fs.readdirSync(upload_directory);
    // error checking
    if (files_array.length == 0) {
      // adding return will stop the rest of the operations
      return res.status(503).send({
        message: "No images",
      });
    }
    let filename = _.sample(files_array);
    res.sendFile(path.join(upload_directory, filename));
  });

module.exports = router;
