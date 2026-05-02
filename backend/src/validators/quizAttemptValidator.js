const Joi = require("joi");

const quizAttemptSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  quiz_id: Joi.number().integer().required(),
  submitted_at: Joi.date().allow(null).optional(),
  score: Joi.number().precision(2).allow(null).optional(),
  max_score: Joi.number().precision(2).allow(null).optional()
});

module.exports = { quizAttemptSchema };
