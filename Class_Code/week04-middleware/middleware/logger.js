// moving logger into its own function
const logger = (req, res, next) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  console.log(`[${formattedDate}] ${req.method} ${req.originalUrl}`);
  next();
};

module.exports = { logger };
