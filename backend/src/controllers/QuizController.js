const QuizService = require("../services/QuizService");

class QuizController {
  async getAll(req, res) {
    try {
      const quizzes = await QuizService.getAllQuizzes();
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const quiz = await QuizService.getQuizById(req.params.id);
      res.status(200).json(quiz);
    } catch (error) {
      if (error.message === "Quiz not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const quiz = await QuizService.createQuiz(req.body);
      res.status(201).json(quiz);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const quiz = await QuizService.updateQuiz(req.params.id, req.body);
      res.status(200).json(quiz);
    } catch (error) {
      if (error.message === "Quiz not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await QuizService.deleteQuiz(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "Quiz not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new QuizController();
