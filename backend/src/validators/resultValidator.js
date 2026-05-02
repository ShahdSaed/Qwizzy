const Joi = require("joi");

const resultSchema = Joi.object({
  quiz_attempt_id: Joi.number().integer().required(),
  final_score: Joi.number().precision(2).required(),
  max_score: Joi.number().precision(2).required(),
  percentage: Joi.number().precision(2).required(),
  status: Joi.string().valid('pass', 'fail').required()
});

module.exports = { resultSchema };
