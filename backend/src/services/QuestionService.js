const QuestionRepository = require("../repositories/QuestionRepository");

const getAllQuestions = async () => {
  return await QuestionRepository.findAll();
};

const getQuestionById = async (id) => {
  const question = await QuestionRepository.findById(id);
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
};

const createQuestion = async (data) => {
  return await QuestionRepository.create(data);
};

const updateQuestion = async (id, data) => {
  const updatedQuestion = await QuestionRepository.update(id, data);
  if (!updatedQuestion) {
    throw new Error("Question not found");
  }
  return updatedQuestion;
};

const deleteQuestion = async (id) => {
  const success = await QuestionRepository.delete(id);
  if (!success) {
    throw new Error("Question not found");
  }
  return success;
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};

