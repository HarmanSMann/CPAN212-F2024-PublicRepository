const http = require("http");
const fs = require("fs");
const path = require("path")

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  } 
  else if (req.url === "/contact_us") {
    res.write("Contact Page");
    res.end();
  } 
  else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
      <html>
        <head>
          <title>About Us</title>
        </head>
        <body>
          <h1>Welcome to the About Page</h1>
          <p>This is a simple HTML content.</p>
        </body>
      </html>
    `);
    res.end();
  } 
  else if (req.url === "/home") {
    fs.readFile("home.html", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write("File not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
      }
      res.end();
    });
  } 
  else if (req.url === "/api/courses") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Page not found");
    res.end();
  }
});

server.listen(3000);
console.log("Listening on port 3000");
