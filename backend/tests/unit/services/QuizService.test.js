const QuizService = require('../../../src/services/QuizService');
const QuizRepository = require('../../../src/repositories/QuizRepository');

jest.mock('../../../src/repositories/QuizRepository');

describe('QuizService (Unit)', () => {
    describe('findById', () => {
        it('should return quiz if it exists', async () => {
            const mockQuiz = { id: '1', title: 'Software Engineering Quiz' };
            QuizRepository.findById.mockResolvedValue(mockQuiz);

            const result = await QuizService.findById('1');
            
            expect(result.title).toBe('Software Engineering Quiz');
            expect(QuizRepository.findById).toHaveBeenCalledWith('1');
        });

        it('should throw 404 if quiz not found (Edge Case)', async () => {
            QuizRepository.findById.mockResolvedValue(null);

            await expect(QuizService.findById('inv'))
                .rejects.toThrow('Quiz not found');
        });
    });
});
