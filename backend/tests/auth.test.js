// Mock db before anything else
jest.mock('../src/config/db', () => ({
    query: jest.fn()
}));

const UserService = require('../src/services/UserService');
const UserRepository = require('../src/repositories/UserRepository');

// Mock UserRepository
jest.mock('../src/repositories/UserRepository');

describe('UserService', () => {
    describe('login', () => {
        it('should throw error if user not found', async () => {
            UserRepository.findByEmail.mockResolvedValue(null);
            
            await expect(UserService.login('nonexistent@example.com', 'password'))
                .rejects.toThrow();
        });
    });
});
