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
    res.write("about");
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
