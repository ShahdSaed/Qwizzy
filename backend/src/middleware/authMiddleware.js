const { verifyToken } = require("../utils/jwtUtils");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }

  req.user = decoded; // Attach user payload to request
  next();
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "instructor") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Instructor role required." });
  }
};

module.exports = {
  authenticate,
  authorizeAdmin
};
