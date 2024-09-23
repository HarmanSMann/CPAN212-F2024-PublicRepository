const http = require("http");
const hostname = "127.0.0.1"; // or localhost, they are the same name
const port = 3000;
const server = http.createServer((req, res) => {
  console.log(req);
  console.log("URL:", req.url); // we use this
  console.log("Method:", req.method); // we use this
  console.log("Headers:", req.headers); // we use this
  console.log("Body:", req.body); // we use this
  console.log("Params:", req.params); // we use this -> built in
  console.log("Query:", req.query); // we use this -> built in
  console.log("Cookies:", req.cookies); // we build this - Week 10
  console.log("Session:", req.session); // we build this - Week 10
  console.log("IP:", req.ip);
  console.log("Hostname:", req.hostname);
  console.log("Protocol:", req.protocol);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
