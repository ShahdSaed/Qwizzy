const QuizRepository = require("../repositories/QuizRepository");

const getAllQuizzes = async () => {
  return await QuizRepository.findAll();
};

const getQuizById = async (id) => {
  const quiz = await QuizRepository.findById(id);
  if (!quiz) {
    throw new Error("Quiz not found");
  }
  return quiz;
};

const createQuiz = async (data) => {
  if (!data.title || !data.created_by_user_id) {
    throw new Error("Title and creator ID are required");
  }
  return await QuizRepository.create(data);
};

const updateQuiz = async (id, data) => {
  const updatedQuiz = await QuizRepository.update(id, data);
  if (!updatedQuiz) {
    throw new Error("Quiz not found");
  }
  return updatedQuiz;
};

const deleteQuiz = async (id) => {
  const success = await QuizRepository.delete(id);
  if (!success) {
    throw new Error("Quiz not found");
  }
  return success;
};

module.exports = {
  getAllQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};

