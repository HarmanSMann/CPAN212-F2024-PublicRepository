const http = require("http");
const PORT = 8000;
const fs = require("fs");
const path = require("path");

/*
phase 6 - replacing DRY code
lets make it into a function. 

What do you notice when you read these 2 function calls:

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

    The only place that has changed is the filename, home.html and about.html, 
    so we can factor that as our change and make that an argument to 
      check for when we enter an endpoint


    Using your previous knowledge of REACT and javascript we will write 
      an arrow funtion to handle it and return the data
    This solution is the quick way of setting things up

    I will also only update the home and about for the comparison, 
    next version showcases the cleaned version

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
