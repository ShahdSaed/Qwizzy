const QuestionOptionRepository = require("../repositories/QuestionOptionRepository");

class QuestionOptionService {
  async getAllOptions() {
    return await QuestionOptionRepository.findAll();
  }

  async getOptionById(id) {
    const option = await QuestionOptionRepository.findById(id);
    if (!option) {
      throw new Error("Question option not found");
    }
    return option;
  }

  async createOption(data) {
    return await QuestionOptionRepository.create(data);
  }

  async updateOption(id, data) {
    const updatedOption = await QuestionOptionRepository.update(id, data);
    if (!updatedOption) {
      throw new Error("Question option not found");
    }
    return updatedOption;
  }

  async deleteOption(id) {
    const success = await QuestionOptionRepository.delete(id);
    if (!success) {
      throw new Error("Question option not found");
    }
    return success;
  }
}

module.exports = new QuestionOptionService();
