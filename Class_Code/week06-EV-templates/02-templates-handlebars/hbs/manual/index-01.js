// lets render a page
// create 
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

// app.engine(file_extension, engine_use(directory))
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("view engine", ".hbs");

// replaced information
app.get("/", (req, res) => {
  // find the home.hbs file, and fill in the information
  res.render("home", {
    title: "Home Page",
    message: "Welcome to Handlebars with Express!",
  });
});


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
