const Joi = require("joi");

const categorySchema = Joi.object({
  NAME: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow(null, '').optional()
});

module.exports = {
  categorySchema
};
