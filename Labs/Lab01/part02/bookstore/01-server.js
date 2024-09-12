const http = require("http");
const PORT = 8000;

// phase 2 of building the server, adding endpoints
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("welcome to the home page");
    res.end();
  } else if (req.url === "/about") {
    res.write("welcome to the about page");
    res.end();
  } else if (req.url === "/contact") {
    res.write("welcome to the contact page");
    res.end();
  } else if (req.url === "/login") {
    res.write("welcome to the login page");
    res.end();
  } else {
    res.write("page not found");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
