const request = require('supertest');
const app = require('../../app');
const { db } = require('../../src/config/db');
const passwordUtils = require('../../src/utils/passwordUtils');
const jwtUtils = require('../../src/utils/jwtUtils');
const { mockUser, mockJwtToken } = require('../helpers/testHelpers');

// We ONLY mock the database layer and external utilities
jest.mock('../../src/utils/passwordUtils');
jest.mock('../../src/utils/emailUtils');
jest.mock('../../src/utils/jwtUtils');

describe('Auth Integration Tests (Full Flow)', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jwtUtils.generateToken.mockReturnValue(mockJwtToken);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('POST /api/users/signin', () => {
        it('should return 200 and token when all layers work together', async () => {
            db.query.mockResolvedValue([[mockUser]]); 
            passwordUtils.comparePassword.mockResolvedValue(true);

            const response = await request(app)
                .post('/api/users/signin')
                .send({
                    email: mockUser.email,
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.token).toBe(mockJwtToken);
        });

        it('should return 401 for invalid password (Error Flow)', async () => {
            db.query.mockResolvedValue([[mockUser]]); 
            passwordUtils.comparePassword.mockResolvedValue(false); // Wrong password

            const response = await request(app)
                .post('/api/users/signin')
                .send({
                    email: mockUser.email,
                    password: 'wrong_password'
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should return 401 for unverified account (Error Flow)', async () => {
            db.query.mockResolvedValue([[{ ...mockUser, is_verified: 0 }]]); 

            const response = await request(app)
                .post('/api/users/signin')
                .send({
                    email: mockUser.email,
                    password: 'password123'
                });

            expect(response.status).toBe(401);
            expect(response.body.message).toMatch(/verify your email/);
        });

        it('should return 400 for missing email (Validation Flow)', async () => {
            const response = await request(app)
                .post('/api/users/signin')
                .send({
                    password: 'password123'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Validation Error");
            expect(response.body).toHaveProperty('errors');
        });
    });

    describe('POST /api/users/signup', () => {
        it('should register a new user successfully', async () => {
            const newUser = { ...mockUser, email: 'new@email.com' };
            db.query.mockResolvedValueOnce([[]]); // No existing user (SELECT)
            db.query.mockResolvedValueOnce([{ insertId: 1 }]); // Create user (INSERT)
            db.query.mockResolvedValueOnce([[newUser]]); // Create -> findById (SELECT)
            
            passwordUtils.hashPassword.mockResolvedValue('hashed');

            const response = await request(app)
                .post('/api/users/signup')
                .send({
                    email: 'new@email.com',
                    password: 'password123',
                    full_name: 'New User',
                    role: 'user'
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.data.email).toBe('new@email.com');
        });

        it('should return 400 if email already exists', async () => {
            db.query.mockResolvedValue([[mockUser]]); // Email exists

            const response = await request(app)
                .post('/api/users/signup')
                .send({
                    email: mockUser.email,
                    password: 'password123',
                    full_name: 'Test',
                    role: 'user'
                });

            expect(response.status).toBe(400);
            expect(response.body.message).toBe("Email already exists");
        });
    });
});
