jest.mock('../src/config/db', () => ({
    query: jest.fn()
}));

const QuestionOptionService = require('../src/services/QuestionOptionService');
const QuestionOptionRepository = require('../src/repositories/QuestionOptionRepository');
const QuestionRepository = require('../src/repositories/QuestionRepository');

jest.mock('../src/repositories/QuestionOptionRepository');
jest.mock('../src/repositories/QuestionRepository');

describe('QuestionOptionService', () => {
    describe('update', () => {
        it('should throw error if trying to set a second correct option', async () => {
            const mockOption = { id: 'opt1', question_id: 'q1', is_correct: 0 };
            const existingCorrect = { id: 'opt2', question_id: 'q1', is_correct: 1 };
            
            QuestionOptionRepository.findById.mockResolvedValue(mockOption);
            QuestionOptionRepository.findCorrectOptionByQuestionId.mockResolvedValue(existingCorrect);

            await expect(QuestionOptionService.update('opt1', { is_correct: 1 }))
                .rejects.toThrow('This question already has another correct option');
        });

        it('should allow update if is_correct is false', async () => {
            const mockOption = { id: 'opt1', question_id: 'q1', is_correct: 1 };
            QuestionOptionRepository.findById.mockResolvedValue(mockOption);
            QuestionOptionRepository.update.mockResolvedValue({ ...mockOption, is_correct: 0 });

            const result = await QuestionOptionService.update('opt1', { is_correct: 0 });
            expect(result.is_correct).toBe(0);
        });
    });
});
