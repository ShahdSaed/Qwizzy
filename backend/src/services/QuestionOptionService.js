const QuestionOptionRepository = require("../repositories/QuestionOptionRepository");

const getAllOptions = async () => {
  return await QuestionOptionRepository.findAll();
};

const getOptionById = async (id) => {
  const option = await QuestionOptionRepository.findById(id);
  if (!option) {
    throw new Error("Question option not found");
  }
  return option;
};

const createOption = async (data) => {
  return await QuestionOptionRepository.create(data);
};

const updateOption = async (id, data) => {
  const updatedOption = await QuestionOptionRepository.update(id, data);
  if (!updatedOption) {
    throw new Error("Question option not found");
  }
  return updatedOption;
};

const deleteOption = async (id) => {
  const success = await QuestionOptionRepository.delete(id);
  if (!success) {
    throw new Error("Question option not found");
  }
  return success;
};

module.exports = {
  getAllOptions,
  getOptionById,
  createOption,
  updateOption,
  deleteOption,
};

