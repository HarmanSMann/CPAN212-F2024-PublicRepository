const http = require("http");
const PORT = 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
