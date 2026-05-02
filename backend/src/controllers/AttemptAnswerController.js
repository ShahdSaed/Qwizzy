const AttemptAnswerService = require("../services/AttemptAnswerService");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const answers = await AttemptAnswerService.getAll();
  res.status(200).json({ success: true, data: answers });
});

exports.getById = asyncHandler(async (req, res) => {
  const answer = await AttemptAnswerService.findById(req.params.id);
  res.status(200).json({ success: true, data: answer });
});

exports.create = asyncHandler(async (req, res) => {
  const answer = await AttemptAnswerService.create(req.body);
  res.status(201).json({ success: true, data: answer });
});

exports.update = asyncHandler(async (req, res) => {
  const answer = await AttemptAnswerService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data: answer });
});

exports.delete = asyncHandler(async (req, res) => {
  await AttemptAnswerService.delete(req.params.id);
  res.status(204).send();
});