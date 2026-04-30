const QuizCategoryRepository = require("../repositories/QuizCategoryRepository");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await QuizCategoryRepository.findAll();
};

exports.findByIds = async (quiz_id, category_id) => {
  const mapping = await QuizCategoryRepository.findByIds(quiz_id, category_id);
  if (!mapping) {
    throw new AppError("Quiz Category mapping not found", 404);
  }
  return mapping;
};

exports.create = async (data) => {
  return await QuizCategoryRepository.create(data);
};

exports.delete = async (quiz_id, category_id) => {
  const success = await QuizCategoryRepository.delete(quiz_id, category_id);
  if (!success) {
    throw new AppError("Quiz Category mapping not found", 404);
  }
  return success;
};
