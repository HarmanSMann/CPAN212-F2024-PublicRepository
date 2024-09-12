const http = require("http");
const PORT = 8000;
const fs = require("fs");
const path = require("path");

/*
phase 5
Just to show you the additional mess we get from not DRY coding
Notice we do this multiple times:
read file, find path to file, find file
if error getting file, send error message
otherwise send them the data


*/

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "pages", "home.html"), (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/about") {
    fs.readFile(path.join(__dirname, "pages", "about.html"), (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/contact") {
    fs.readFile(path.join(__dirname, "pages", "contact.html"), (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.write(data);
        res.end();
      }
    });
  } else if (req.url === "/login") {
    fs.readFile(path.join(__dirname, "pages", "login.html"), (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.write(data);
        res.end();
      }
    });
  } else {
    fs.readFile(path.join(__dirname, "pages", "error.html"), (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.write(data);
        res.end();
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
