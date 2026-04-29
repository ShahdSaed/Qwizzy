const QuizCategoryRepository = require("../repositories/QuizCategoryRepository");

const getAllQuizCategories = async () => {
  return await QuizCategoryRepository.findAll();
};

const getQuizCategoryByIds = async (quiz_id, category_id) => {
  const mapping = await QuizCategoryRepository.findByIds(quiz_id, category_id);
  if (!mapping) {
    throw new Error("Quiz Category mapping not found");
  }
  return mapping;
};

const createQuizCategory = async (data) => {
  return await QuizCategoryRepository.create(data);
};

const deleteQuizCategory = async (quiz_id, category_id) => {
  const success = await QuizCategoryRepository.delete(quiz_id, category_id);
  if (!success) {
    throw new Error("Quiz Category mapping not found");
  }
  return success;
};

module.exports = {
  getAllQuizCategories,
  getQuizCategoryByIds,
  createQuizCategory,
  deleteQuizCategory,
};

