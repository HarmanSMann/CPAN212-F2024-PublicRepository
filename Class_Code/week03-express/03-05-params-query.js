const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path");

// I showcased youtube and ebay for examples of query and params
// youtube.com/watch?v=ijbnaib3ey -> localhost:8000/watch?v=videoId
// ebay.ca/itm/diubdy3b8ibud3 -> localhost:8000/itm/:itemId

// lets make a quick example down here:
// for this, we need to look into whats inside the 
// request object, things are simplidied for us, they have an object called params and query

// this wont do anything for us, lets go into postman and see the behaviour
app.get("/params", (req, res)=>{
  console.log(req.bob)
  console.log(req.params)
  console.log(req.query)
  console.log(req.body)
  res.send("using params")
})

// ebay copy -> localhost:8000/itm/:itemId
app.get("/params/:itemId", (req, res)=>{
  console.log(req.params)
  console.log(req.query)
  res.send("using ebay example")
})

app.get("/query", (req, res)=>{
  console.log(req.params)
  console.log(req.query)
  res.send("using query")
})
// youtube example -> localhost:8000/watch?v=videoId
app.get("/watch", (req, res)=>{
  console.log(req.params)
  console.log(req.query)
  res.send("using youtube example")
})


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
