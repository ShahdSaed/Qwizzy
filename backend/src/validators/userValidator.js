const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().min(2).max(150).required(),
  role: Joi.string().valid("user", "admin").optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateUserSchema = Joi.object({
  full_name: Joi.string().min(2).max(150).optional(),
  role: Joi.string().valid("user", "admin").optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema
};
