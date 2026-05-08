jest.mock('../src/config/db', () => ({
    query: jest.fn()
}));

const QuizService = require('../src/services/QuizService');
const QuizRepository = require('../src/repositories/QuizRepository');

jest.mock('../src/repositories/QuizRepository');

describe('QuizService', () => {
    describe('getById', () => {
        it('should throw error if quiz not found', async () => {
            QuizRepository.findById.mockResolvedValue(null);
            await expect(QuizService.findById('invalid-id'))
                .rejects.toThrow('Quiz not found');
        });

        it('should return quiz if it exists', async () => {
            const mockQuiz = { id: '1', title: 'Math Quiz' };
            QuizRepository.findById.mockResolvedValue(mockQuiz);
            const result = await QuizService.findById('1');
            expect(result.title).toBe('Math Quiz');
        });
    });
});
