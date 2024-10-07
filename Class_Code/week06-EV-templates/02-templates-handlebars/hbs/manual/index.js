// lets try the built in helpers
const express = require("express");
const exphbs = require("express-handlebars");
const customHelpers = require('./views/helpers/customHelpers');

const app = express();

// app.engine(file_extension, engine_use(directory))
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: customHelpers,
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

// Sample data
const sampleData = {
  user: { name: "John Doe", email: "john@example.com" },
  users: [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
  ],
  condition: false,
};

// if
app.get("/if", (req, res) => {
  res.render("if", { user: sampleData.user });
});

// unless
app.get("/unless", (req, res) => {
  res.render("unless", { condition: sampleData.condition});
  // res.render("unless", { condition: sampleData.condition, user : sampleData.user});
});

// each
app.get("/each", (req, res) => {
  res.render("each", { users: sampleData.users });
});

//customhelper
app.get("/custom-helper-example", (req, res) => {
  const sampleDataCH = {
    name: 'John Doe',
    birthday: '1990-01-01',
    message: 'Hello, Custom Helpers!'
  };
  res.render("chExample", sampleDataCH);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
