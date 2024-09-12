const http = require("http");
const PORT = 8000;
const fs = require("fs");
const path = require("path");
/*
phase 7 - cleaned code (we can do more, but I will leave it for now)
if you know you have a simpler operation like sending data, we coud move everything to readpage function

that is under "server.js"
*/

const readpage = (filename) => {
  fs.readFile(path.join(__dirname, "pages", filename), (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
    } else {
      return data;
    }
  });
};

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    let data = readpage("home.html");
    res.write(data);
    res.end();
  } else if (req.url === "/about") {
    let data = readpage("about.html");
    res.write(data);
    res.end();
  } else if (req.url === "/contact") {
    let data = readpage("contact.html");
    res.write(data);
    res.end();
  } else if (req.url === "/login") {
    let data = readpage("login.html");
    res.write(data);
    res.end();
  } else {
    let data = readpage("error.html");
    res.write(data);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
