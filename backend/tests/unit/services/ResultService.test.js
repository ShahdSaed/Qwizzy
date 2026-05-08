const ResultService = require('../../../src/services/ResultService');
const ResultRepository = require('../../../src/repositories/ResultRepository');

jest.mock('../../../src/repositories/ResultRepository');

describe('ResultService (Unit)', () => {
    describe('findById', () => {
        it('should throw 404 if result not found (Edge Case)', async () => {
            ResultRepository.findById.mockResolvedValue(null);
            
            await expect(ResultService.findById('inv'))
                .rejects.toThrow('Result not found');
        });

        it('should return result when found', async () => {
            const mockRes = { id: 'r1', final_score: 100 };
            ResultRepository.findById.mockResolvedValue(mockRes);
            
            const result = await ResultService.findById('r1');
            expect(result.id).toBe('r1');
            expect(ResultRepository.findById).toHaveBeenCalledWith('r1');
        });
    });
});
