const Joi = require("joi");

const quizSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  description: Joi.string().allow(null, '').optional(),
  created_by_user_id: Joi.number().integer().required(),
  is_published: Joi.boolean().optional(),
  time_limit_minutes: Joi.number().integer().min(1).allow(null).optional()
});

module.exports = { quizSchema };
