const validate = (schema) => {
  if (!schema || typeof schema.validate !== 'function') {
    console.error("Validation Middleware Error: Schema is undefined or invalid.");
    return (req, res, next) => next(); // Or return a 500 error
  }
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(err => err.message);
      return res.status(400).json({
        message: "Validation Error",
        errors
      });
    }
    
    next();
  };
};

module.exports = validate;

