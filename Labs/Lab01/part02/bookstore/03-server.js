const http = require("http");
const PORT = 8000;
const fs = require("fs");
const path = require("path");

/*
phase 4 
1 - move the html code into an html file
2 - organize it into a subfolder called pages
3 - this is a lesson from class -> use FS and Path to read the file and send the data

3.1 - we need to import fs and path
3.2 - we need to understand fs and path
3.2.1 - fs needs to know what its grabbing, and in our case, its ../pages/home.html
    so we need __dirname to get us here, and we can add on the /pages and /home.html
    If you were in class, the data we recieve is stored in buffer, which becomes a 
    problem to send directly, so we need to convert it to UTF8

3.3 - after reading the file, we should send the data over

Example down below for homepage, next time we will see it on everything
Note: I have only included the homepage here, for sanity sake

*/

const server = http.createServer((req, res) => {
  if (req.url === "/") {
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
