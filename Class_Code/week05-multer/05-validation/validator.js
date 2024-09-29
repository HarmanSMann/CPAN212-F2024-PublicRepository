const { body, validationResult } = require("express-validator");

const registerValidator = [
  body("first_name").notEmpty().withMessage("First Name is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please Enter a valid Email Adress"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("Password should be atleast 5 characters"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = {registerValidator, validate};
