const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");

/*
  Now, recall this: you had to send over a form for your react class, what do you remember
  1 - you use the same fetch/axios command
  2 - you provide the information you need to send it using "method: POST"

  Well, how do we handle that, the default method we have is GET, so we need to make a POST call
  Lets do that with login
*/

/*
  I recieve data on /login, with method POST
  I need to extract that information from the incoming request 
  we use the item called body -> req.body

  We cannot see anything because the data we send is encoded, its encrypted so it isnt seen over the network
  we need to unbundle it, and we need somthing to do that. 
  
*/



//login -> GET and POST
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});


app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("login complete");
});

app.get("/params", (req, res) => {
  console.log(req.bob);
  console.log(req.params);
  console.log(req.query);
  console.log(req.body);
  res.send("using params");
});

// ebay copy -> localhost:8000/itm/:itemId
app.get("/params/:itemId", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send("using ebay example");
});

app.get("/query", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send("using query");
});
// youtube example -> localhost:8000/watch?v=videoId
app.get("/watch", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  res.send("using youtube example");
});

// home page
app.get("/", (req, res) => {
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

// catch all route, Please, put this at the buttom otherwise you block the other routes
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
