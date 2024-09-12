const http = require("http");

const server = http.createServer((req, res) => {
  // console.log("1")
  if (req.url === "/") {
    // console.log("2")
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 200; j++) {
        for (let k = 0; k < 200; k++) {
          console.log(`${i} ${j} ${k}`);
        }
      }
    }
    // console.log("3")
    res.write("Counter finished\n");
    res.end("About Page");
    // console.log("4")
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000);
