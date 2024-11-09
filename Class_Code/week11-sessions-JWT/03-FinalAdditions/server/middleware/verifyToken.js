const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Secret key for JWT

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Remove "Bearer " prefix if it exists
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    req.userId = decoded.userId; // Add user ID to the request object
    next(); // Allow the request to proceed to the next handler
  });
};

module.exports = verifyToken;


// const jwt = require("jsonwebtoken")
// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Secret key for JWT


// const verifyToken = (req, res, next) => {
//   console.log(req.headers)
//   const token = req.headers["authorization"];

//   if (!token) {
//     return res.status(403).json({ message: "No token provided" });
//   }

//   jwt.verify(token, JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: "Failed to authenticate token" });
//     }

//     req.userId = decoded.userId; // Add user ID to the request object
//     next(); // Allow the request to proceed to the next handler
//   });
// };

// module.exports = verifyToken;
