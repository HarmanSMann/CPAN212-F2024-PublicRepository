// removing as much of the DRY code as I can while making some sense
const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 8000;

// Synchronous file reading
const getfile = (filename) => {
  try {
    return fs.readFileSync(path.join(__dirname, "pages", filename));
  } catch (err) {
    throw err;
  }
};

const sendResponse = (req, res, filename) => {
  try {
    let data = getfile(filename);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  } catch (err) {
    res.end("Error loading page");
  }
};
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    sendResponse(req, res, "home.html");
  } else if (req.url === "/about") {
    sendResponse(req, res, "about.html");
  } else if (req.url === "/login") {
    if (req.method === "POST") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("WELCOME TO THE POST METHOD for LOGIN");
    } else {
      sendResponse(req, res, "login.html");
    }
  } else {
    sendResponse(req, res, "error.html");
  }
});

server.listen(8000, () => {
  console.log(`http://localhost:${PORT}`);
});
