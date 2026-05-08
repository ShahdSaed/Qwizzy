const QuestionService = require('../../../src/services/QuestionService');
const QuestionRepository = require('../../../src/repositories/QuestionRepository');
const QuestionFactory = require('../../../src/utils/questionFactory');

jest.mock('../../../src/repositories/QuestionRepository');
jest.mock('../../../src/utils/questionFactory');

describe('QuestionService (Unit)', () => {
    it('should use QuestionFactory for creation', async () => {
        const mockData = { body: 'Q', points: 1 };
        QuestionFactory.create.mockReturnValue({ id: 'u', ...mockData });
        
        await QuestionService.create(mockData);
        expect(QuestionFactory.create).toHaveBeenCalled();
        expect(QuestionRepository.create).toHaveBeenCalled();
    });
});
