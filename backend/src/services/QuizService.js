const QuizRepository = require("../repositories/QuizRepository");

class QuizService {
  async getAllQuizzes() {
    return await QuizRepository.findAll();
  }

  async getQuizById(id) {
    const quiz = await QuizRepository.findById(id);
    if (!quiz) {
      throw new Error("Quiz not found");
    }
    return quiz;
  }

  async createQuiz(data) {
    if (!data.title || !data.created_by_user_id) {
      throw new Error("Title and creator ID are required");
    }
    return await QuizRepository.create(data);
  }

  async updateQuiz(id, data) {
    const updatedQuiz = await QuizRepository.update(id, data);
    if (!updatedQuiz) {
      throw new Error("Quiz not found");
    }
    return updatedQuiz;
  }

  async deleteQuiz(id) {
    const success = await QuizRepository.delete(id);
    if (!success) {
      throw new Error("Quiz not found");
    }
    return success;
  }
}

module.exports = new QuizService();
