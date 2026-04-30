const CategoryRepository = require("../repositories/CategoryRepository");
const { v4: uuid } = require("uuid");
const getAllCategories = async () => {
  return await CategoryRepository.findAll();
};

const getCategoryById = async (id) => {
  const category = await CategoryRepository.findById(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

const createCategory = async (data) => {
  if (!data.name) {
    throw new Error("Category name is required");
  }
  data.id = uuid();
  return await CategoryRepository.create(data);
};

const updateCategory = async (id, data) => {
  const updatedCategory = await CategoryRepository.update(id, data);
  if (!updatedCategory) {
    throw new Error("Category not found");
  }
  return updatedCategory;
};

const deleteCategory = async (id) => {
  const success = await CategoryRepository.delete(id);
  if (!success) {
    throw new Error("Category not found");
  }
  return success;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

