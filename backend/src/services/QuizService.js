const QuizRepository = require("../repositories/QuizRepository");
const { v4: uuid } = require("uuid");

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

const createQuiz = async (data, user) => {
  if (!data.title || !user.id) {
    throw new Error("Title and creator ID are required");
  }
  return await QuizRepository.create({
    id: uuid(),
    title: data.title,
    description: data.description,
    created_by_user_id: user.id,
    is_published: data.is_published || false,
    time_limit_minutes: data.time_limit_minutes || null,
    difficulty: data.difficulty || 'medium'
  });
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

