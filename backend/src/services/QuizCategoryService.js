const QuizCategoryRepository = require("../repositories/QuizCategoryRepository");

class QuizCategoryService {
  async getAllQuizCategories() {
    return await QuizCategoryRepository.findAll();
  }

  async getQuizCategoryByIds(quiz_id, category_id) {
    const mapping = await QuizCategoryRepository.findByIds(quiz_id, category_id);
    if (!mapping) {
      throw new Error("Quiz Category mapping not found");
    }
    return mapping;
  }

  async createQuizCategory(data) {
    return await QuizCategoryRepository.create(data);
  }

  async deleteQuizCategory(quiz_id, category_id) {
    const success = await QuizCategoryRepository.delete(quiz_id, category_id);
    if (!success) {
      throw new Error("Quiz Category mapping not found");
    }
    return success;
  }
}

module.exports = new QuizCategoryService();
