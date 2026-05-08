const QuestionRepository = require("../repositories/QuestionRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");
const { createQuestion } = require("../utils/questionFactory");

exports.getAll = async () => {
  return await QuestionRepository.findAll();
};

exports.findById = async (id) => {
  const question = await QuestionRepository.findById(id);
  if (!question) {
    throw new AppError("Question not found", 404);
  }
  return question;
};

exports.findByQuizId = async (quiz_id) => {
  const question = await QuestionRepository.findByQuizId(quiz_id);
  if (!question) {
    throw new AppError("Question not found", 404);
  }
  return question;
};

exports.create = async (data) => {
  const questionData = createQuestion(data);
  return await QuestionRepository.create(questionData);
};

exports.update = async (id, data) => {
  const updatedQuestion = await QuestionRepository.update(id, data);
  if (!updatedQuestion) {
    throw new AppError("Question not found", 404);
  }
  return updatedQuestion;
};

exports.delete = async (id) => {
  const success = await QuestionRepository.delete(id);
  if (!success) {
    throw new AppError("Question not found", 404);
  }
  return success;
};
