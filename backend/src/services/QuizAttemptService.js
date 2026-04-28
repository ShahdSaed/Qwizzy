const QuizAttemptRepository = require("../repositories/QuizAttemptRepository");

class QuizAttemptService {
  async getAllAttempts() {
    return await QuizAttemptRepository.findAll();
  }

  async getAttemptById(id) {
    const attempt = await QuizAttemptRepository.findById(id);
    if (!attempt) {
      throw new Error("Quiz attempt not found");
    }
    return attempt;
  }

  async createAttempt(data) {
    return await QuizAttemptRepository.create(data);
  }

  async updateAttempt(id, data) {
    const updatedAttempt = await QuizAttemptRepository.update(id, data);
    if (!updatedAttempt) {
      throw new Error("Quiz attempt not found");
    }
    return updatedAttempt;
  }

  async deleteAttempt(id) {
    const success = await QuizAttemptRepository.delete(id);
    if (!success) {
      throw new Error("Quiz attempt not found");
    }
    return success;
  }
}

module.exports = new QuizAttemptService();
