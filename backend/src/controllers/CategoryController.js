const CategoryService = require("../services/CategoryService");

const getAll = async (req, res) => {
  try {
    const categories = await CategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const category = await CategoryService.getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    if (error.message === "Category not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: "Category name already exists" });
    }
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    res.status(200).json(category);
  } catch (error) {
    if (error.message === "Category not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await CategoryService.deleteCategory(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "Category not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteCategory
};

