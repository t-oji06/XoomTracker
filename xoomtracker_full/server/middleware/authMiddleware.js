const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = function authMiddleware(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
