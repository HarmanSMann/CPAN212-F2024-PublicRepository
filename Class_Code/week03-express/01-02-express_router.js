const express = require('express');
const app = express();

// Handle GET request
app.get('/', (req, res) => {
  res.send('Received a GET request');
});

// Handle POST request
app.post('/', (req, res) => {
  res.send('Received a POST request');
});

// Handle PUT request
app.put('/', (req, res) => {
  res.send('Received a PUT request');
});

// Handle DELETE request
app.delete('/', (req, res) => {
  res.send('Received a DELETE request');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});
