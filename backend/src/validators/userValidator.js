const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  full_name: Joi.string().min(2).max(150).required(),
  role: Joi.string().valid("user", "instructor").optional().default("user")
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(4).required()
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(6).required()
});

const verifyForgotPasswordCodeSchema = Joi.object({
  email: Joi.string().email().required(),
  code: Joi.string().length(4).required()
});

const updateUserSchema = Joi.object({
  full_name: Joi.string().min(2).max(150).optional(),
  //role: Joi.string().valid("user", "instructor").optional().default("user"),
  password: Joi.string().min(6).optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyForgotPasswordCodeSchema,
  updateUserSchema
};
