const CategoryRepository = require("../repositories/CategoryRepository");

class CategoryService {
  async getAllCategories() {
    return await CategoryRepository.findAll();
  }

  async getCategoryById(id) {
    const category = await CategoryRepository.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async createCategory(data) {
    if (!data.name) {
      throw new Error("Category name is required");
    }
    return await CategoryRepository.create(data);
  }

  async updateCategory(id, data) {
    const updatedCategory = await CategoryRepository.update(id, data);
    if (!updatedCategory) {
      throw new Error("Category not found");
    }
    return updatedCategory;
  }

  async deleteCategory(id) {
    const success = await CategoryRepository.delete(id);
    if (!success) {
      throw new Error("Category not found");
    }
    return success;
  }
}

module.exports = new CategoryService();
