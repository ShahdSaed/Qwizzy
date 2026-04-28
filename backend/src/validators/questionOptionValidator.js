const Joi = require("joi");

const questionOptionSchema = Joi.object({
  question_id: Joi.number().integer().required(),
  label: Joi.string().max(500).required(),
  is_correct: Joi.boolean().default(false),
  sort_order: Joi.number().integer().default(0)
});

module.exports = { questionOptionSchema };
