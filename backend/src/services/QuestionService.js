const QuestionRepository = require("../repositories/QuestionRepository");

class QuestionService {
  async getAllQuestions() {
    return await QuestionRepository.findAll();
  }

  async getQuestionById(id) {
    const question = await QuestionRepository.findById(id);
    if (!question) {
      throw new Error("Question not found");
    }
    return question;
  }

  async createQuestion(data) {
    return await QuestionRepository.create(data);
  }

  async updateQuestion(id, data) {
    const updatedQuestion = await QuestionRepository.update(id, data);
    if (!updatedQuestion) {
      throw new Error("Question not found");
    }
    return updatedQuestion;
  }

  async deleteQuestion(id) {
    const success = await QuestionRepository.delete(id);
    if (!success) {
      throw new Error("Question not found");
    }
    return success;
  }
}

module.exports = new QuestionService();
