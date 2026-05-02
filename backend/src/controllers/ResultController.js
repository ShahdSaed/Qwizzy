const ResultService = require("../services/ResultService");

class ResultController {
  async getAll(req, res) {
    try {
      const results = await ResultService.getAllResults();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await ResultService.getResultById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Result not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const result = await ResultService.createResult(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await ResultService.updateResult(req.params.id, req.body);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === "Result not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await ResultService.deleteResult(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === "Result not found") {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ResultController();
