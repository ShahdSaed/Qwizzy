// Mock db before anything else
jest.mock('../src/config/db', () => ({
    query: jest.fn()
}));

const UserService = require('../src/services/UserService');
const UserRepository = require('../src/repositories/UserRepository');
const passwordUtils = require('../src/utils/passwordUtils');

// Mock dependencies
jest.mock('../src/repositories/UserRepository');
jest.mock('../src/utils/passwordUtils');
jest.mock('../src/utils/jwtUtils', () => ({
    generateToken: jest.fn(() => 'mock_token')
}));
jest.mock('../src/utils/emailUtils', () => ({
    sendEmail: jest.fn(),
    getEmailTemplate: jest.fn()
}));

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('login', () => {
        it('should throw error if user not found', async () => {
            UserRepository.findByEmail.mockResolvedValue(null);
            await expect(UserService.login('wrong@email.com', 'password'))
                .rejects.toThrow('Invalid email or password');
        });

        it('should return token if credentials are valid', async () => {
            const mockUser = { id: '1', email: 'test@email.com', password_hash: 'hashed', is_verified: 1 };
            UserRepository.findByEmail.mockResolvedValue(mockUser);
            passwordUtils.comparePassword.mockResolvedValue(true);
            
            const result = await UserService.login('test@email.com', 'password');
            expect(result).toHaveProperty('token');
            expect(result.token).toBe('mock_token');
        });
    });

    describe('register', () => {
        it('should throw error if email already exists', async () => {
            UserRepository.findByEmail.mockResolvedValue({ id: '1' });
            await expect(UserService.register({ email: 'exists@email.com' }))
                .rejects.toThrow('Email already exists');
        });
    });
});
