jest.mock('../src/config/db', () => ({
    query: jest.fn()
}));

const CategoryService = require('../src/services/CategoryService');
const CategoryRepository = require('../src/repositories/CategoryRepository');
jest.mock('../src/repositories/CategoryRepository');

describe('CategoryService', () => {
    it('should return all categories', async () => {
        CategoryRepository.findAll.mockResolvedValue([{ name: 'Math' }]);
        const result = await CategoryService.getAll();
        expect(result[0].name).toBe('Math');
    });
});
