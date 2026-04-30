const CategoryRepository = require("../repositories/CategoryRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await CategoryRepository.findAll();
};

exports.findById = async (id) => {
  const category = await CategoryRepository.findById(id);
  if (!category) {
    throw new AppError("Category not found", 404);
  }
  return category;
};

exports.create = async (data) => {
  if (!data.name) {
    throw new AppError("Category name is required", 400);
  }
  data.id = uuid();
  return await CategoryRepository.create(data);
};

exports.update = async (id, data) => {
  const updatedCategory = await CategoryRepository.update(id, data);
  if (!updatedCategory) {
    throw new AppError("Category not found", 404);
  }
  return updatedCategory;
};

exports.delete = async (id) => {
  const success = await CategoryRepository.delete(id);
  if (!success) {
    throw new AppError("Category not found", 404);
  }
  return success;
};
