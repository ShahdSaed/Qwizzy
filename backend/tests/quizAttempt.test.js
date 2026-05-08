jest.mock('../src/config/db', () => ({
    query: jest.fn()
}));

const QuizAttemptService = require('../src/services/QuizAttemptService');
const QuestionRepository = require('../src/repositories/QuestionRepository');
const QuizAttemptRepository = require('../src/repositories/QuizAttemptRepository');
const AttemptAnswerRepository = require('../src/repositories/AttemptAnswerRepository');
const ResultRepository = require('../src/repositories/ResultRepository');

jest.mock('../src/repositories/QuestionRepository');
jest.mock('../src/repositories/QuizAttemptRepository');
jest.mock('../src/repositories/AttemptAnswerRepository');
jest.mock('../src/repositories/ResultRepository');

describe('QuizAttemptService', () => {
    describe('submit', () => {
        it('should calculate score correctly using strategy', async () => {
            const mockQuestions = [
                { 
                    id: 'q1', 
                    points: 10, 
                    body: 'Q1',
                    options: [
                        { id: 'o1', label: 'A', is_correct: 1 },
                        { id: 'o2', label: 'B', is_correct: 0 }
                    ]
                }
            ];
            
            QuestionRepository.findByQuizId.mockResolvedValue(mockQuestions);
            QuizAttemptRepository.create.mockResolvedValue({});
            AttemptAnswerRepository.create.mockResolvedValue({});

            const userAnswers = [{ question_id: 'q1', selected_option_id: 'o1' }]; // Correct answer
            const user = { id: 'user1' };

            const result = await QuizAttemptService.submit('quiz1', userAnswers, user);

            expect(result.score).toBe(10);
            expect(result.status).toBe('pass');
            expect(result.results[0].is_correct).toBe(true);
            expect(ResultRepository.create).toHaveBeenCalled();
        });

        it('should handle incorrect answers', async () => {
            const mockQuestions = [
                { 
                    id: 'q1', 
                    points: 10, 
                    body: 'Q1',
                    options: [
                        { id: 'o1', label: 'A', is_correct: 1 },
                        { id: 'o2', label: 'B', is_correct: 0 }
                    ]
                }
            ];
            
            QuestionRepository.findByQuizId.mockResolvedValue(mockQuestions);
            
            const userAnswers = [{ question_id: 'q1', selected_option_id: 'o2' }]; // Wrong answer
            const user = { id: 'user1' };

            const result = await QuizAttemptService.submit('quiz1', userAnswers, user);

            expect(result.score).toBe(0);
            expect(result.results[0].is_correct).toBe(false);
        });
    });
});
