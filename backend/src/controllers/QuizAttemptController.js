const QuizAttemptService = require("../services/QuizAttemptService");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const attempts = await QuizAttemptService.getAll();
  res.status(200).json({ success: true, data: attempts });
});

exports.getById = asyncHandler(async (req, res) => {
  const attempt = await QuizAttemptService.findById(req.params.id);
  res.status(200).json({ success: true, data: attempt });
});

exports.create = asyncHandler(async (req, res) => {
  const attempt = await QuizAttemptService.create(req.body, req.user);
  res.status(201).json({ success: true, data: attempt });
});

exports.submit = asyncHandler(async (req, res) => {
  const { quiz_id, answers } = req.body;
  const result = await QuizAttemptService.submit(quiz_id, answers, req.user);
  res.status(200).json({ success: true, data: result });
});
 
 exports.update = asyncHandler(async (req, res) => {
  const attempt = await QuizAttemptService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data: attempt });
});

exports.delete = asyncHandler(async (req, res) => {
  await QuizAttemptService.delete(req.params.id);
  res.status(204).send();
});