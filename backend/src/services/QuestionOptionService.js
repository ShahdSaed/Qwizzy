const QuestionOptionRepository = require("../repositories/QuestionOptionRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await QuestionOptionRepository.findAll();
};

exports.findById = async (id) => {
  const option = await QuestionOptionRepository.findById(id);
  if (!option) {
    throw new AppError("Question option not found", 404);
  }
  return option;
};

exports.findByQuestionId = async (question_id) => {
  return await QuestionOptionRepository.findByQuestionId(question_id);
};

exports.create = async (data) => {
  data.id = uuid();
  return await QuestionOptionRepository.create(data);
};

exports.update = async (id, data) => {
  const updatedOption = await QuestionOptionRepository.update(id, data);
  if (!updatedOption) {
    throw new AppError("Question option not found", 404);
  }
  return updatedOption;
};

exports.delete = async (id) => {
  const success = await QuestionOptionRepository.delete(id);
  if (!success) {
    throw new AppError("Question option not found", 404);
  }
  return success;
};