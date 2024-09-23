const http = require("http");

// Create a local server to receive data from
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      data: "Hello World!",
    })
  );
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Welcome to the server: http://localhost:${PORT}`);
});
