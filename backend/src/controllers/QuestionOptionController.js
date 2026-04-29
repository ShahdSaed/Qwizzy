const QuestionOptionService = require("../services/QuestionOptionService");

const getAll = async (req, res) => {
  try {
    const options = await QuestionOptionService.getAllOptions();
    res.status(200).json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const option = await QuestionOptionService.getOptionById(req.params.id);
    res.status(200).json(option);
  } catch (error) {
    if (error.message === "Question option not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const option = await QuestionOptionService.createOption(req.body);
    res.status(201).json(option);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const option = await QuestionOptionService.updateOption(req.params.id, req.body);
    res.status(200).json(option);
  } catch (error) {
    if (error.message === "Question option not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const deleteOption = async (req, res) => {
  try {
    await QuestionOptionService.deleteOption(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "Question option not found") {
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
  delete: deleteOption
};

