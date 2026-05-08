const QuestionOptionService = require('../../../src/services/QuestionOptionService');
const QuestionOptionRepository = require('../../../src/repositories/QuestionOptionRepository');
const QuestionRepository = require('../../../src/repositories/QuestionRepository');

jest.mock('../../../src/repositories/QuestionOptionRepository');
jest.mock('../../../src/repositories/QuestionRepository');

describe('QuestionOptionService (Unit)', () => {
    describe('create', () => {
        it('should block creating a duplicate label for the same question', async () => {
            const data = { question_id: 'q1', label: 'Paris' };
            QuestionRepository.findById.mockResolvedValue({ id: 'q1' });
            QuestionOptionRepository.findByLabelAndQuestionId.mockResolvedValue({ id: 'opt_old', label: 'Paris' });

            await expect(QuestionOptionService.create(data))
                .rejects.toThrow('This option already exists for this question.');
        });
    });

    describe('update', () => {
        it('should block setting a duplicate label when updating', async () => {
            const currentOption = { id: 'opt1', question_id: 'q1', label: 'Cairo' };
            const existingDuplicate = { id: 'opt2', question_id: 'q1', label: 'London' };
            
            QuestionOptionRepository.findById.mockResolvedValue(currentOption);
            QuestionOptionRepository.findByLabelAndQuestionId.mockResolvedValue(existingDuplicate);

            await expect(QuestionOptionService.update('opt1', { label: 'London' }))
                .rejects.toThrow('This option label already exists for this question.');
        });

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
            QuestionOptionRepository.findByLabelAndQuestionId.mockResolvedValue(null); // No duplicate
            QuestionOptionRepository.update.mockResolvedValue({ ...mockOption, label: 'New' });

            const result = await QuestionOptionService.update('opt1', { label: 'New' });
            
            expect(result.label).toBe('New');
            expect(QuestionOptionRepository.update).toHaveBeenCalled();
        });
    });
});
