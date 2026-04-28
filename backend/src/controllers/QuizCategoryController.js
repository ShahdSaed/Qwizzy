const QuizCategoryService = require("../services/QuizCategoryService");

class QuizCategoryController {
  async getAll(req, res) {
    try {
      const mappings = await QuizCategoryService.getAllQuizCategories();
      res.status(200).json(mappings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const mapping = await QuizCategoryService.createQuizCategory(req.body);
      res.status(201).json(mapping);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { quiz_id, category_id } = req.params;
      await QuizCategoryService.deleteQuizCategory(quiz_id, category_id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "Quiz Category mapping not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new QuizCategoryController();
