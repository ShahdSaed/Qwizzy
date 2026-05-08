const CategoryService = require('../../../src/services/CategoryService');
const CategoryRepository = require('../../../src/repositories/CategoryRepository');

jest.mock('../../../src/repositories/CategoryRepository');

describe('CategoryService (Unit)', () => {
    it('should return all categories', async () => {
        CategoryRepository.findAll.mockResolvedValue([{ id: '1', name: 'General' }]);
        
        const result = await CategoryService.getAll();
        
        expect(result.length).toBe(1);
        expect(CategoryRepository.findAll).toHaveBeenCalled();
    });
});
