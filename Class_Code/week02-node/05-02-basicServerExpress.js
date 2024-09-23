const http = require("http");
const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World");
        res.end();
      }
      else {
        res.write("page does not exist");
        res.end();
      }
});

server.listen(3000);

console.log("Listening to on port 3000");
