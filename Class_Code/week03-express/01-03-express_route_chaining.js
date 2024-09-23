const express = require('express');
const app = express();

// Route chaining to handle GET, POST, PUT, DELETE on the root route
app.route('/')
  .get((req, res) => {
    res.send('Received a GET request');
  })
  .post((req, res) => {
    res.send('Received a POST request');
  })
  .put((req, res) => {
    res.send('Received a PUT request');
  })
  .delete((req, res) => {
    res.send('Received a DELETE request');
  });

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});
