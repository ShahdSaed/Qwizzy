const ResultRepository = require("../repositories/ResultRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await ResultRepository.findAll();
};

exports.findById = async (id) => {
  const result = await ResultRepository.findById(id);
  if (!result) {
    throw new AppError("Result not found", 404);
  }
  return result;
};

exports.create = async (data) => {
  data.id = uuid();
  return await ResultRepository.create(data);
};

exports.update = async (id, data) => {
  const updatedResult = await ResultRepository.update(id, data);
  if (!updatedResult) {
    throw new AppError("Result not found", 404);
  }
  return updatedResult;
};

exports.delete = async (id) => {
  const success = await ResultRepository.delete(id);
  if (!success) {
    throw new AppError("Result not found", 404);
  }
  return success;
};
