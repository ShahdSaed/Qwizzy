const Joi = require("joi");

const createQuizSchema = Joi.object({
  title: Joi.string().min(2).max(255).required(),
  description: Joi.string().allow(null, '').optional(),
  is_published: Joi.boolean().optional(),
  time_limit_minutes: Joi.number().integer().min(1).allow(null).optional(),
  difficulty: Joi.string().valid('easy', 'medium', 'hard').optional().allow(null).default('medium'),
  category_id: Joi.string().uuid().required()

});

module.exports = { createQuizSchema };

