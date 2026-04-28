const QuestionService = require("../services/QuestionService");

class QuestionController {
  async getAll(req, res) {
    try {
      const questions = await QuestionService.getAllQuestions();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const question = await QuestionService.getQuestionById(req.params.id);
      res.status(200).json(question);
    } catch (error) {
      if (error.message === "Question not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const question = await QuestionService.createQuestion(req.body);
      res.status(201).json(question);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const question = await QuestionService.updateQuestion(req.params.id, req.body);
      res.status(200).json(question);
    } catch (error) {
      if (error.message === "Question not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await QuestionService.deleteQuestion(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "Question not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new QuestionController();
