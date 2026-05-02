const Joi = require("joi");

const quizCategorySchema = Joi.object({
  quiz_id: Joi.string().required(),
  category_id: Joi.string().required()

});

module.exports = { quizCategorySchema };
