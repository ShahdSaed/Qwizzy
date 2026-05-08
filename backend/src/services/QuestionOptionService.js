const QuestionOptionRepository = require("../repositories/QuestionOptionRepository");
const QuestionRepository = require("../repositories/QuestionRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await QuestionOptionRepository.findAll();
};

exports.findById = async (id) => {
  const option = await QuestionOptionRepository.findById(id);
  if (!option) {
    throw new AppError("Question option not found", 404);
  }
  return option;
};

exports.findByQuestionId = async (question_id) => {
  return await QuestionOptionRepository.findByQuestionId(question_id);
};

exports.create = async (data) => {
  // Verify question exists
  const question = await QuestionRepository.findById(data.question_id);
  if (!question) {
    throw new AppError(`Question not found with ID: ${data.question_id}`, 404);
  }

  // Check for duplicate label
  const existingLabel = await QuestionOptionRepository.findByLabelAndQuestionId(data.label, data.question_id);
  if (existingLabel) {
    throw new AppError("This option already exists for this question.", 400);
  }

  // If setting this option as correct, check if one already exists
  if (data.is_correct) {
    const existingCorrect = await QuestionOptionRepository.findCorrectOptionByQuestionId(data.question_id);
    if (existingCorrect) {
      throw new AppError("This question already has a correct option.", 400);
    }
  }

  data.id = uuid();
  return await QuestionOptionRepository.create(data);
};

exports.update = async (id, data) => {
  const currentOption = await QuestionOptionRepository.findById(id);
  if (!currentOption) {
    throw new AppError("Question option not found", 404);
  }

  // If setting this option as correct (true or 1), check if another one already exists
  if (data.is_correct == true || data.is_correct == 1) {
    const questionId = data.question_id || currentOption.question_id;
    const existingCorrect = await QuestionOptionRepository.findCorrectOptionByQuestionId(questionId);
    
    if (existingCorrect && existingCorrect.id !== id) {
      throw new AppError("This question already has another correct option. Please unset the current one first.", 400);
    }
  }

  // Check for duplicate label if label is being updated
  if (data.label) {
    const questionId = data.question_id || currentOption.question_id;
    const existingLabel = await QuestionOptionRepository.findByLabelAndQuestionId(data.label, questionId);
    if (existingLabel && existingLabel.id !== id) {
      throw new AppError("This option label already exists for this question.", 400);
    }
  }

  const updatedOption = await QuestionOptionRepository.update(id, data);
  return updatedOption;
};

exports.delete = async (id) => {
  const success = await QuestionOptionRepository.delete(id);
  if (!success) {
    throw new AppError("Question option not found", 404);
  }
  return success;
};