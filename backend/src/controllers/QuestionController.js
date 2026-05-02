const QuestionService = require("../services/QuestionService");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const questions = await QuestionService.getAll();
  res.status(200).json({ success: true, data: questions });
});

exports.getById = asyncHandler(async (req, res) => {
  const question = await QuestionService.findById(req.params.id);
  res.status(200).json({ success: true, data: question });
});

exports.create = asyncHandler(async (req, res) => {
  const question = await QuestionService.create(req.body);
  res.status(201).json({ success: true, data: question });
});

exports.update = asyncHandler(async (req, res) => {
  const question = await QuestionService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data: question });
});

exports.delete = asyncHandler(async (req, res) => {
  await QuestionService.delete(req.params.id);
  res.status(204).send();
});
