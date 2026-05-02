/**
 * Simplified centralized error handling middleware.
 * It just takes the status code and message from the error object.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error] ${req.method} ${req.url} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message: message
  });
};

module.exports = errorHandler;
