const AttemptAnswerRepository = require("../repositories/AttemptAnswerRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await AttemptAnswerRepository.findAll();
};

exports.findById = async (id) => {
  const answer = await AttemptAnswerRepository.findById(id);
  if (!answer) {
    throw new AppError("Attempt answer not found", 404);
  }
  return answer;
};

exports.create = async (data) => {
  data.id = uuid();
  return await AttemptAnswerRepository.create(data);
};

exports.update = async (id, data) => {
  const updatedAnswer = await AttemptAnswerRepository.update(id, data);
  if (!updatedAnswer) {
    throw new AppError("Attempt answer not found", 404);
  }
  return updatedAnswer;
};

exports.delete = async (id) => {
  const success = await AttemptAnswerRepository.delete(id);
  if (!success) {
    throw new AppError("Attempt answer not found", 404);
  }
  return success;
};