const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("1");
  if (req.url === "/") {
    console.log("2");
    try {
      console.log("3");
      const data = fs.readFileSync("text.txt", "utf8");
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("File content:\n" + data);
      console.log("4");
    } catch (err) {
      console.error("Error reading file:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
    console.log("5");
  } else {
    console.log("2 - this comes next");
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
