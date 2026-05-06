const QuestionOptionService = require("../services/QuestionOptionService");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const options = await QuestionOptionService.getAll();
  res.status(200).json({ success: true, data: options });
});

exports.getById = asyncHandler(async (req, res) => {
  const option = await QuestionOptionService.findById(req.params.id);
  res.status(200).json({ success: true, data: option });
});

exports.getByQuestionId = asyncHandler(async (req, res) => {
  const options = await QuestionOptionService.findByQuestionId(req.params.question_id);
  res.status(200).json({ success: true, data: options });
});

exports.create = asyncHandler(async (req, res) => {
  const option = await QuestionOptionService.create(req.body);
  res.status(201).json({ success: true, data: option });
});

exports.update = asyncHandler(async (req, res) => {
  const option = await QuestionOptionService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data: option });
});

exports.delete = asyncHandler(async (req, res) => {
  await QuestionOptionService.delete(req.params.id);
  res.status(204).send({message: "Question option deleted successfully"});
});