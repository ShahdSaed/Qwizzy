const QuizAttemptRepository = require("../repositories/QuizAttemptRepository");

const getAllAttempts = async () => {
  return await QuizAttemptRepository.findAll();
};

const getAttemptById = async (id) => {
  const attempt = await QuizAttemptRepository.findById(id);
  if (!attempt) {
    throw new Error("Quiz attempt not found");
  }
  return attempt;
};

const createAttempt = async (data) => {
  return await QuizAttemptRepository.create(data);
};

const updateAttempt = async (id, data) => {
  const updatedAttempt = await QuizAttemptRepository.update(id, data);
  if (!updatedAttempt) {
    throw new Error("Quiz attempt not found");
  }
  return updatedAttempt;
};

const deleteAttempt = async (id) => {
  const success = await QuizAttemptRepository.delete(id);
  if (!success) {
    throw new Error("Quiz attempt not found");
  }
  return success;
};

module.exports = {
  getAllAttempts,
  getAttemptById,
  createAttempt,
  updateAttempt,
  deleteAttempt,
};

