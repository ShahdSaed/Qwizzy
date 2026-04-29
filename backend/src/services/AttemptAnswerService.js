const AttemptAnswerRepository = require("../repositories/AttemptAnswerRepository");

const getAllAnswers = async () => {
  return await AttemptAnswerRepository.findAll();
};

const getAnswerById = async (id) => {
  const answer = await AttemptAnswerRepository.findById(id);
  if (!answer) {
    throw new Error("Attempt answer not found");
  }
  return answer;
};

const createAnswer = async (data) => {
  return await AttemptAnswerRepository.create(data);
};

const updateAnswer = async (id, data) => {
  const updatedAnswer = await AttemptAnswerRepository.update(id, data);
  if (!updatedAnswer) {
    throw new Error("Attempt answer not found");
  }
  return updatedAnswer;
};

const deleteAnswer = async (id) => {
  const success = await AttemptAnswerRepository.delete(id);
  if (!success) {
    throw new Error("Attempt answer not found");
  }
  return success;
};

module.exports = {
  getAllAnswers,
  getAnswerById,
  createAnswer,
  updateAnswer,
  deleteAnswer,
};

