const QuizAttemptRepository = require("../repositories/QuizAttemptRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await QuizAttemptRepository.findAll();
};

exports.findById = async (id) => {
  const attempt = await QuizAttemptRepository.findById(id);
  if (!attempt) {
    throw new AppError("Quiz attempt not found", 404);
  }
  return attempt;
};

exports.create = async (data, user) => {
  data.id = uuid();
  data.user_id = user.id;
  return await QuizAttemptRepository.create(data);
};

exports.update = async (id, data) => {
  const updatedAttempt = await QuizAttemptRepository.update(id, data);
  if (!updatedAttempt) {
    throw new AppError("Quiz attempt not found", 404);
  }
  return updatedAttempt;
};

exports.delete = async (id) => {
  const success = await QuizAttemptRepository.delete(id);
  if (!success) {
    throw new AppError("Quiz attempt not found", 404);
  }
  return success;
};
