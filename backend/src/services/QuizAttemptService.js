const QuizAttemptRepository = require("../repositories/QuizAttemptRepository");
const QuestionRepository = require("../repositories/QuestionRepository");
const AttemptAnswerRepository = require("../repositories/AttemptAnswerRepository");
const { v4: uuid } = require("uuid");
const AppError = require("../utils/AppError");

exports.getAll = async () => {
  return await QuizAttemptRepository.findAll();
};

exports.findById = async (id) => {
  const attempt = await QuizAttemptRepository.findById(id);
  if (!attempt) {
    throw new AppError("Quiz attempt not found", 404);
  }
  return attempt;
};

exports.create = async (data, user) => {
  data.id = uuid();
  data.user_id = user.id;
  return await QuizAttemptRepository.create(data);
};

exports.submit = async (quiz_id, user_answers, user) => {
  // 1. Fetch questions with options
  const questions = await QuestionRepository.findByQuizId(quiz_id);
  if (!questions || questions.length === 0) {
    throw new AppError("No questions found for this quiz", 404);
  }

  const attemptId = uuid();
  let totalScore = 0;
  let maxScore = 0;
  const detailedResults = [];
  const answersToSave = [];

  // 2. Calculate scores and prepare results
  for (const question of questions) {
    const questionPoints = parseFloat(question.points || 0);
    maxScore += questionPoints;

    const userAnswer = user_answers.find(a => a.question_id === question.id);
    const selectedOptionId = userAnswer ? userAnswer.selected_option_id : null;

    const correctOption = question.options.find(o => o.is_correct);
    const isCorrect = selectedOptionId === (correctOption ? correctOption.id : null);
    
    const earnedPoints = isCorrect ? questionPoints : 0;
    totalScore += earnedPoints;

    // Prepare answer data for saving later
    if (selectedOptionId) {
      answersToSave.push({
        id: uuid(),
        quiz_attempt_id: attemptId,
        question_id: question.id,
        selected_option_id: selectedOptionId,
        is_correct: isCorrect,
        earned_points: earnedPoints
      });
    }

    detailedResults.push({
      question_id: question.id,
      body: question.body,
      selected_option_id: selectedOptionId,
      selected_option_label: question.options.find(o => o.id === selectedOptionId)?.label || null,
      is_correct: isCorrect,
      points: questionPoints,
      earned_points: earnedPoints
    });
  }

  // 3. Save the overall attempt FIRST (The parent record)
  await QuizAttemptRepository.create({
    id: attemptId,
    user_id: user.id,
    quiz_id: quiz_id,
    started_at: new Date(),
    submitted_at: new Date(),
    score: totalScore,
    max_score: maxScore
  });

  // 4. Save individual answers SECOND (The child records)
  for (const answerData of answersToSave) {
    await AttemptAnswerRepository.create(answerData);
  }

  return {
    attempt_id: attemptId,
    quiz_id: quiz_id,
    score: totalScore,
    max_score: maxScore,
    percentage: maxScore > 0 ? (totalScore / maxScore) * 100 : 0,
    results: detailedResults
  };
};

exports.update = async (id, data) => {
  const updatedAttempt = await QuizAttemptRepository.update(id, data);
  if (!updatedAttempt) {
    throw new AppError("Quiz attempt not found", 404);
  }
  return updatedAttempt;
};

exports.delete = async (id) => {
  const success = await QuizAttemptRepository.delete(id);
  if (!success) {
    throw new AppError("Quiz attempt not found", 404);
  }
  return success;
};
