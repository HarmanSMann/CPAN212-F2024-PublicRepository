const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

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

// Routes
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    message: "Welcome to Handlebars with Express!",
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});