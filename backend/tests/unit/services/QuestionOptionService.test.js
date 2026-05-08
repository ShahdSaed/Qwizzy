const QuestionOptionService = require('../../../src/services/QuestionOptionService');
const QuestionOptionRepository = require('../../../src/repositories/QuestionOptionRepository');
const QuestionRepository = require('../../../src/repositories/QuestionRepository');

jest.mock('../../../src/repositories/QuestionOptionRepository');
jest.mock('../../../src/repositories/QuestionRepository');

describe('QuestionOptionService (Unit)', () => {
    describe('update', () => {
        it('should block setting multiple correct options (Edge Case: Business Logic)', async () => {
            const mockOption = { id: 'opt1', question_id: 'q1', is_correct: 0 };
            const existingCorrect = { id: 'opt2', question_id: 'q1', is_correct: 1 };
            
            QuestionOptionRepository.findById.mockResolvedValue(mockOption);
            QuestionOptionRepository.findCorrectOptionByQuestionId.mockResolvedValue(existingCorrect);

            await expect(QuestionOptionService.update('opt1', { is_correct: 1 }))
                .rejects.toThrow('This question already has another correct option');
        });

        it('should allow normal update when is_correct is not changed', async () => {
            const mockOption = { id: 'opt1', question_id: 'q1', is_correct: 0 };
            QuestionOptionRepository.findById.mockResolvedValue(mockOption);
            QuestionOptionRepository.update.mockResolvedValue({ ...mockOption, label: 'New' });

            const result = await QuestionOptionService.update('opt1', { label: 'New' });
            
            expect(result.label).toBe('New');
            expect(QuestionOptionRepository.update).toHaveBeenCalled();
        });
    });
});
