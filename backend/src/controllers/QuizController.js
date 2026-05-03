const QuizService = require("../services/QuizService");
const asyncHandler = require("../utils/asyncHandler");

exports.getAll = asyncHandler(async (req, res) => {
  const quizzes = await QuizService.getAll();
  res.status(200).json({ success: true, data: quizzes });
});

exports.getAllWithQuestions = asyncHandler(async (req, res) => {
  const quizzes = await QuizService.getAllWithQuestions();
  res.status(200).json({ success: true, data: quizzes });
});
exports.getById = asyncHandler(async (req, res) => {
  const quiz = await QuizService.findById(req.params.id);
  res.status(200).json({ success: true, data: quiz });
});


exports.create = asyncHandler(async (req, res) => {
  const quiz = await QuizService.create(req.body, req.user);
  res.status(201).json({ success: true, data: quiz });
});

exports.update = asyncHandler(async (req, res) => {
  const quiz = await QuizService.update(req.params.id, req.body);
  res.status(200).json({ success: true, data: quiz });
});

exports.delete = asyncHandler(async (req, res) => {
  const result = await QuizService.delete(req.params.id);
  res.status(200).json({ success: true, ...result });
});