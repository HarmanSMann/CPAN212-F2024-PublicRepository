const express = require("express");
const exphbs = require("express-handlebars");
const customHelpers = require('./views/helpers/customHelpers');
const app = express();

// Updated
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
    helpers: customHelpers
  })
);
app.set("view engine", ".hbs");

// Sample data
const sampleData = {
  user: { name: "John Doe", email: "john@example.com" },
  users: [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob", email: "bob@example.com" },
  ],
  condition: false,
};

// Routes
app.get("/custom-helper-example", (req, res) => {
  const sampleDataCH = {
    name: 'John Doe',
    birthday: '1990-01-01',
    message: 'Hello, Custom Helpers!'
  };
  res.render("customHelperExample", sampleDataCH);
});

app.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    message: "Welcome to Handlebars with Express!",
  });
});

app.get("/viewData", (req, res) => {
  const data = {
    name: "John Doe",
    age: 30,
    occupation: "Software Engineer",
    company: "Tech Corp",
  };
  res.render("viewData", { data });
});

app.get("/if", (req, res) => {
  res.render("if", { user: sampleData.user });
});

app.get("/unless", (req, res) => {
  res.render("unless", { condition: sampleData.condition });
});

app.get("/each", (req, res) => {
  res.render("each", { users: sampleData.users });
});

app.get("/with", (req, res) => {
  res.render("with", { user: sampleData.user });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
