const QuizRepository = require("../repositories/QuizRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");
const e = require("express");

exports.getAll = async (user) => {
  const instructorId = (user && user.role === 'instructor') ? user.id : null;
  const quizzes = await QuizRepository.findAll(instructorId);
  return quizzes;
};

exports.getAllWithQuestionCount = async (user) => {
  const instructorId = (user && user.role === 'instructor') ? user.id : null;
  const quizzes = await QuizRepository.findAllWithQuestionCount(instructorId);
  return quizzes;
};

exports.findById = async (id) => {
  const quiz = await QuizRepository.findById(id);
  if (!quiz) {
    throw new AppError("Quiz not found", 404);
  }
  return quiz;
};

exports.create = async (data, user) => {
  if (!data.title || !user.id) {
    throw new AppError("Title and creator ID are required", 400);
  }
  data.id = uuid();
  data.created_by_user_id = user.id;
  return await QuizRepository.create(data);
};

exports.update = async (id, data) => {
  const updatedQuiz = await QuizRepository.update(id, data);
  if (!updatedQuiz) {
    throw new AppError("Quiz not found", 404);
  }
  return updatedQuiz;
};

exports.delete = async (id) => {
  const success = await QuizRepository.delete(id);
  if (!success) {
    throw new AppError("Quiz not found", 404);
  }
  return { success, message: "Quiz deleted successfully" };
};
