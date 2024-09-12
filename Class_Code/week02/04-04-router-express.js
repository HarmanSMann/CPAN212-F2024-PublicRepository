const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/contact_us', (req, res) => {
  res.send('Contact Page');
});

app.get('/about', (req, res) => {
  res.type('html').send('about');
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
