const AttemptAnswerRepository = require("../repositories/AttemptAnswerRepository");

class AttemptAnswerService {
  async getAllAnswers() {
    return await AttemptAnswerRepository.findAll();
  }

  async getAnswerById(id) {
    const answer = await AttemptAnswerRepository.findById(id);
    if (!answer) {
      throw new Error("Attempt answer not found");
    }
    return answer;
  }

  async createAnswer(data) {
    return await AttemptAnswerRepository.create(data);
  }

  async updateAnswer(id, data) {
    const updatedAnswer = await AttemptAnswerRepository.update(id, data);
    if (!updatedAnswer) {
      throw new Error("Attempt answer not found");
    }
    return updatedAnswer;
  }

  async deleteAnswer(id) {
    const success = await AttemptAnswerRepository.delete(id);
    if (!success) {
      throw new Error("Attempt answer not found");
    }
    return success;
  }
}

module.exports = new AttemptAnswerService();
