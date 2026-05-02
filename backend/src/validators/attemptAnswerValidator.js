const Joi = require("joi");

const attemptAnswerSchema = Joi.object({
  quiz_attempt_id: Joi.string().required(),
  question_id: Joi.string().required(),
  selected_option_id: Joi.string().required(),

  is_correct: Joi.boolean().default(false),
  earned_points: Joi.number().precision(2).default(0.00)
});

module.exports = { attemptAnswerSchema };
