// run this: npm i express
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

// Endpoint to send JSON data to the client
app.get("/data", (req, res) => {
  fs.readFile("users.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading the file" });
    }
    res.status(200).json(JSON.parse(data));
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
