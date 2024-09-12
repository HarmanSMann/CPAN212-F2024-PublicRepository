const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World");
    res.end();
  }
  else if (req.url === "about") {
    res.write("about us");
    res.end();
  }
  else if (req.url === "/login") {
    res.write("login");
    res.end();
  }
  else if (req.url === "/register") {
    res.write("register");
    res.end();
  }
  else if (req.url === "/logout") {
    res.write("logout");
    res.end();
  }
  else {
    res.write("page not found");
    res.end();
  }
});

server.listen(3000);

console.log("Listening to on port 3000");








