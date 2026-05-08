const UserService = require('../../../src/services/UserService');
const UserRepository = require('../../../src/repositories/UserRepository');
const passwordUtils = require('../../../src/utils/passwordUtils');
const jwtUtils = require('../../../src/utils/jwtUtils');
const { mockUser, mockJwtToken } = require('../../helpers/testHelpers');

// Mock dependencies
jest.mock('../../../src/repositories/UserRepository');
jest.mock('../../../src/utils/passwordUtils');
jest.mock('../../../src/utils/jwtUtils');
jest.mock('../../../src/utils/emailUtils', () => ({
    sendEmail: jest.fn(),
    getEmailTemplate: jest.fn()
}));

describe('UserService (Unit)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jwtUtils.generateToken.mockReturnValue(mockJwtToken);
    });
    describe('login', () => {
        it('should throw error if user not found (Edge Case: Null return)', async () => {
            UserRepository.findByEmail.mockResolvedValue(null);
            
            await expect(UserService.login('wrong@email.com', 'password'))
                .rejects.toThrow('Invalid email or password');
            
            expect(UserRepository.findByEmail).toHaveBeenCalledWith('wrong@email.com');
        });

        it('should throw error if user is not verified (Edge Case: Business Logic)', async () => {
            UserRepository.findByEmail.mockResolvedValue({ id: '1', is_verified: 0 });
            
            await expect(UserService.login('test@email.com', 'password'))
                .rejects.toThrow('Please verify your email before logging in');
        });

        it('should return token if credentials are valid', async () => {
            UserRepository.findByEmail.mockResolvedValue(mockUser);
            passwordUtils.comparePassword.mockResolvedValue(true);
            
            const result = await UserService.login(mockUser.email, 'password');
            
            expect(result).toHaveProperty('token');
            expect(result.token).toBe(mockJwtToken);
            expect(passwordUtils.comparePassword).toHaveBeenCalled();
        });
    });

    describe('register', () => {
        it('should throw error if email already exists', async () => {
            UserRepository.findByEmail.mockResolvedValue({ id: '1' });
            
            await expect(UserService.register({ email: 'exists@email.com' }))
                .rejects.toThrow('Email already exists');
        });

        it('should create user if email is new (Edge Case: Valid Data)', async () => {
            UserRepository.findByEmail.mockResolvedValue(null);
            UserRepository.create.mockResolvedValue({ id: '2', email: 'new@email.com', full_name: 'New User' });
            passwordUtils.hashPassword.mockResolvedValue('hashed');

            const result = await UserService.register({ email: 'new@email.com', password: 'pass', full_name: 'New User' });
            
            expect(UserRepository.create).toHaveBeenCalled();
            expect(result.id).toBe('2');
        });
    });
});
