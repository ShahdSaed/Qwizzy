const QuizCategoryService = require("../services/QuizCategoryService");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const mappings = await QuizCategoryService.getAll();
  res.status(200).json({ success: true, data: mappings });
});

exports.create = asyncHandler(async (req, res) => {
  const mapping = await QuizCategoryService.create(req.body);
  res.status(201).json({ success: true, data: mapping });
});

exports.delete = asyncHandler(async (req, res) => {
  const { quiz_id, category_id } = req.params;
  await QuizCategoryService.delete(quiz_id, category_id);
  res.status(204).send();
});