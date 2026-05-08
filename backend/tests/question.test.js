jest.mock('../src/config/db', () => ({
    query: jest.fn()
}));

const QuestionService = require('../src/services/QuestionService');
const QuestionRepository = require('../src/repositories/QuestionRepository');
const QuestionFactory = require('../src/utils/questionFactory');

jest.mock('../src/repositories/QuestionRepository');
jest.mock('../src/utils/questionFactory');

describe('QuestionService', () => {
    describe('create', () => {
        it('should use QuestionFactory to create a question', async () => {
            const mockData = { body: 'What is JS?', points: 5 };
            const mockFactoryResult = { id: 'uuid', ...mockData };
            
            QuestionFactory.create.mockReturnValue(mockFactoryResult);
            QuestionRepository.create.mockResolvedValue(mockFactoryResult);

            const result = await QuestionService.create(mockData);

            expect(QuestionFactory.create).toHaveBeenCalledWith(mockData);
            expect(result.id).toBe('uuid');
        });
    });
});
