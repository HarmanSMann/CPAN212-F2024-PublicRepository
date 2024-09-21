const express = require("express");
// this is like calling app, but its meant to be an extension of the app.js
const router = express.Router();

// variables
let name = "Harman";
let s_number = "N123456789";

router.get("/", (req, res) => {
  console.log(req);
  res.send("Welcome to the Express App!");
});

router.get("/name", (req, res) => {
  res.send("Harman Mann");
});

router.get("/greeting", (req, res) => {
  res.send(`Hello I'm ${name}, and my student number is ${s_number}`);
});

// with params
router.get("/add/:number1/:number2/", (req, res) => {
  // based on the route, we have 2 variables: number1, number2
  res.send(
    JSON.stringify(
      parseFloat(req.params.number1) + parseFloat(req.params.number2)
    )
  );
});

// http://127.0.0.1:8000/add_query?number1=21&number2=10000
router.get("/add_query", (req, res) => {
  // based on the route, we have 2 variables: number1, number2
  console.log(req.query);
  res.send(
    JSON.stringify(
      parseFloat(req.query.number1) + parseFloat(req.query.number2)
    )
  );
});

// You WILL get problems here with the + sign, because your URL will convert that character into " " (space)
router.get("/calculate", (req, res) => {
  const { a, b, operation } = req.query;
  let result;
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);

  switch (operation) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    case "**":
      result = num1 ** num2;
      break;
    default:
      return res.send("Invalid operation");
  }

  res.send(`The result of ${a} ${operation} ${b} is ${result}`);
});

module.exports = router;
