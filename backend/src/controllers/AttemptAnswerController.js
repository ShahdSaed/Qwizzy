const AttemptAnswerService = require("../services/AttemptAnswerService");

const getAll = async (req, res) => {
  try {
    const answers = await AttemptAnswerService.getAllAnswers();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const answer = await AttemptAnswerService.getAnswerById(req.params.id);
    res.status(200).json(answer);
  } catch (error) {
    if (error.message === "Attempt answer not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const answer = await AttemptAnswerService.createAnswer(req.body);
    res.status(201).json(answer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const answer = await AttemptAnswerService.updateAnswer(req.params.id, req.body);
    res.status(200).json(answer);
  } catch (error) {
    if (error.message === "Attempt answer not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    await AttemptAnswerService.deleteAnswer(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "Attempt answer not found") {
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
  delete: deleteAnswer
};

