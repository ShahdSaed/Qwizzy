const ResultRepository = require("../repositories/ResultRepository");

const getAllResults = async () => {
  return await ResultRepository.findAll();
};

const getResultById = async (id) => {
  const result = await ResultRepository.findById(id);
  if (!result) {
    throw new Error("Result not found");
  }
  return result;
};

const createResult = async (data) => {
  return await ResultRepository.create(data);
};

const updateResult = async (id, data) => {
  const updatedResult = await ResultRepository.update(id, data);
  if (!updatedResult) {
    throw new Error("Result not found");
  }
  return updatedResult;
};

const deleteResult = async (id) => {
  const success = await ResultRepository.delete(id);
  if (!success) {
    throw new Error("Result not found");
  }
  return success;
};

module.exports = {
  getAllResults,
  getResultById,
  createResult,
  updateResult,
  deleteResult,
};

