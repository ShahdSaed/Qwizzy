const Joi = require("joi");

const quizCategorySchema = Joi.object({
  quiz_id: Joi.number().integer().required(),
  category_id: Joi.number().integer().required()
});

module.exports = { quizCategorySchema };
