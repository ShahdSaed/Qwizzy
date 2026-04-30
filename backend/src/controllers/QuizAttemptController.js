const QuizAttemptService = require("../services/QuizAttemptService");

const getAll = async (req, res) => {
  try {
    const attempts = await QuizAttemptService.getAllAttempts();
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const attempt = await QuizAttemptService.getAttemptById(req.params.id);
    res.status(200).json(attempt);
  } catch (error) {
    if (error.message === "Quiz attempt not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const attempt = await QuizAttemptService.createAttempt(req.body, req.user);
    res.status(201).json(attempt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const attempt = await QuizAttemptService.updateAttempt(req.params.id, req.body);
    res.status(200).json(attempt);
  } catch (error) {
    if (error.message === "Quiz attempt not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const deleteAttempt = async (req, res) => {
  try {
    await QuizAttemptService.deleteAttempt(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "Quiz attempt not found") {
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
  delete: deleteAttempt
};

