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

const { StandardScoringStrategy } = require("../utils/scoringStrategies");

const ResultRepository = require("../repositories/ResultRepository");

exports.submit = async (quiz_id, user_answers, user) => {
  // 1. Fetch questions with options
  const questions = await QuestionRepository.findByQuizId(quiz_id);
  if (!questions || questions.length === 0) {
    throw new AppError("No questions found for this quiz", 404);
  }

  // 2. Use Strategy Pattern for scoring
  const scoringStrategy = new StandardScoringStrategy();
  const { totalScore, maxScore, results, answersToSave } = scoringStrategy.calculate(questions, user_answers);

  const attemptId = uuid();
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const status = percentage >= 50 ? 'pass' : 'fail';

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
    await AttemptAnswerRepository.create({
      id: uuid(),
      quiz_attempt_id: attemptId,
      ...answerData
    });
  }

  // 5. Save the final result in the 'results' table
  await ResultRepository.create({
    id: uuid(),
    quiz_attempt_id: attemptId,
    final_score: totalScore,
    max_score: maxScore,
    percentage: percentage,
    STATUS: status
  });

  return {
    attempt_id: attemptId,
    quiz_id: quiz_id,
    score: totalScore,
    max_score: maxScore,
    percentage: percentage,
    status: status,
    results: results
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
