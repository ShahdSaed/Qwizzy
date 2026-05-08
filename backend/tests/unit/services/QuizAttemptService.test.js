const QuizAttemptService = require('../../../src/services/QuizAttemptService');
const QuestionRepository = require('../../../src/repositories/QuestionRepository');
const QuizAttemptRepository = require('../../../src/repositories/QuizAttemptRepository');
const AttemptAnswerRepository = require('../../../src/repositories/AttemptAnswerRepository');
const ResultRepository = require('../../../src/repositories/ResultRepository');

jest.mock('../../../src/repositories/QuestionRepository');
jest.mock('../../../src/repositories/QuizAttemptRepository');
jest.mock('../../../src/repositories/AttemptAnswerRepository');
jest.mock('../../../src/repositories/ResultRepository');

describe('QuizAttemptService (Unit)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('submit', () => {
        it('should throw error if quiz has no questions (Edge Case: Empty Quiz)', async () => {
            QuestionRepository.findByQuizId.mockResolvedValue([]);
            
            await expect(QuizAttemptService.submit('quiz1', [], { id: 'u1' }))
                .rejects.toThrow('No questions found for this quiz');
        });

        it('should calculate score correctly and save results', async () => {
            const mockQuestions = [
                { 
                    id: 'q1', points: 10, body: 'Q1',
                    options: [{ id: 'o1', label: 'A', is_correct: 1 }]
                }
            ];
            
            QuestionRepository.findByQuizId.mockResolvedValue(mockQuestions);
            
            const userAnswers = [{ question_id: 'q1', selected_option_id: 'o1' }];
            const user = { id: 'user1' };

            const result = await QuizAttemptService.submit('quiz1', userAnswers, user);

            expect(result.score).toBe(10);
            expect(QuizAttemptRepository.create).toHaveBeenCalled();
            expect(ResultRepository.create).toHaveBeenCalled();
            expect(AttemptAnswerRepository.create).toHaveBeenCalled();
        });
    });
});
