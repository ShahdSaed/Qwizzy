const Joi = require("joi");

const resultSchema = Joi.object({
  quiz_attempt_id: Joi.string().required(),

  final_score: Joi.number().precision(2).required(),
  max_score: Joi.number().precision(2).required(),
  percentage: Joi.number().precision(2).required(),
  STATUS: Joi.string().valid('pass', 'fail').required(),
  achieved_at: Joi.date().optional()
});

module.exports = { resultSchema };
