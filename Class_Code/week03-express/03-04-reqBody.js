const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");

// express gives us access to a few more things in the request object and the response object


// home page
app.get("/", (req, res) => {
  console.log(req.body)
  console.log(req.params)
  console.log(req.headers)
  console.log(req.query)
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

//about
app.get("/about", (req, res) => {
  res.send("Welcome to the about page");
});

// contact
app.get("/contact", (req, res) => {
  res.send("Welcome to contact");
});

// getdata
app.get("/getdata", (req, res) => {
  const mydata = {
    one: "first",
    two: "second",
    three: "third",
    four: "fourth",
  };
  res.json(mydata);
  // res.json({ data: mydata }); // or this, you have to look into making documentation for how you send data
});

//login -> GET and POST
app.get("/login", (req, res) => {
  res.send("login page");
});

app.post("/login", (req, res) => {
  res.send("login page");
});

// catch all route, Please, put this at the buttom otherwise you block the other routes
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
