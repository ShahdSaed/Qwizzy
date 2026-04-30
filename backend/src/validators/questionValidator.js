const Joi = require("joi");

const questionSchema = Joi.object({
  quiz_id: Joi.string().required(),

  question_type: Joi.string().valid('MCQ', 'TRUE_FALSE').required(),
  body: Joi.string().required(),
  points: Joi.number().precision(2).default(1.00),
  sort_order: Joi.number().integer().default(0)
});

module.exports = { questionSchema };
