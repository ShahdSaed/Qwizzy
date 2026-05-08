jest.mock('../src/config/db', () => ({
    query: jest.fn()
}));

const ResultService = require('../src/services/ResultService');
const ResultRepository = require('../src/repositories/ResultRepository');
jest.mock('../src/repositories/ResultRepository');

describe('ResultService', () => {
    it('should throw error if result not found', async () => {
        ResultRepository.findById.mockResolvedValue(null);
        await expect(ResultService.findById('inv'))
            .rejects.toThrow('Result not found');
    });
});
