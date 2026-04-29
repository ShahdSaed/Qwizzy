const ResultService = require("../services/ResultService");

const getAll = async (req, res) => {
  try {
    const results = await ResultService.getAllResults();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await ResultService.getResultById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Result not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await ResultService.createResult(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const result = await ResultService.updateResult(req.params.id, req.body);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === "Result not found") {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ message: error.message });
  }
};

const deleteResult = async (req, res) => {
  try {
    await ResultService.deleteResult(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === "Result not found") {
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
  delete: deleteResult
};

