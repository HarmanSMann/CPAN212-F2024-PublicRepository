const hello = (req, res, next) => {
  console.log("hello");
  next();
};

module.exports = { hello };
