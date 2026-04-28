const ResultRepository = require("../repositories/ResultRepository");

class ResultService {
  async getAllResults() {
    return await ResultRepository.findAll();
  }

  async getResultById(id) {
    const result = await ResultRepository.findById(id);
    if (!result) {
      throw new Error("Result not found");
    }
    return result;
  }

  async createResult(data) {
    return await ResultRepository.create(data);
  }

  async updateResult(id, data) {
    const updatedResult = await ResultRepository.update(id, data);
    if (!updatedResult) {
      throw new Error("Result not found");
    }
    return updatedResult;
  }

  async deleteResult(id) {
    const success = await ResultRepository.delete(id);
    if (!success) {
      throw new Error("Result not found");
    }
    return success;
  }
}

module.exports = new ResultService();
