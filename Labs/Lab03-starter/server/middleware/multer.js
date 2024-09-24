// adding multer
const multer = require("multer");
const upload_directory = require("../app")

const storage = multer.diskStorage({
  // the function that saves the file
  destination: function (req, file, cb) {
    // where we are storing the file
    cb(null, upload_directory);
  },
  filename: function (req, file, cb) {
    // what is the filename going to be
    cb(null, `${Date.now()}-${file.originalname}`); // this will save files like: date-filename.extension
  },
});

const upload = multer({ storage: storage }); // the middleware function that handles uploading

module.exports = upload;
