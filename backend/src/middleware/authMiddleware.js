const { verifyToken } = require("../utils/jwtUtils");
const AppError = require("../utils/AppError");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Access denied. No token provided.", 401));
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return next(new AppError("Invalid or expired token.", 401));
  }

  req.user = decoded; // Attach user payload to request
  next();
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "instructor") {
    next();
  } else {
    next(new AppError("Access denied. Instructor role required.", 403));
  }
};

module.exports = {
  authenticate,
  authorizeAdmin
};
