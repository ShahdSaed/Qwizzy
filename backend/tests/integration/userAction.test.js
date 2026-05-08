const request = require('supertest');
const app = require('../../app');
const { db } = require('../../src/config/db');
const { mockUser, mockJwtToken } = require('../helpers/testHelpers');

jest.mock('../../src/utils/emailUtils');
jest.mock('../../src/utils/jwtUtils', () => ({
    generateToken: jest.fn(() => mockJwtToken)
}));

describe('User Actions Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/users/verify-email', () => {
        it('should verify email successfully with correct code', async () => {
            db.query.mockResolvedValueOnce([[mockUser]]); // findByVerificationCode (SELECT)
            db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); // update (UPDATE)
            db.query.mockResolvedValueOnce([[mockUser]]); // update -> findById (SELECT)

            const response = await request(app)
                .post('/api/users/verify-email')
                .send({
                    email: mockUser.email,
                    code: '1234'
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe("Email verified successfully");
        });
    });

    describe('POST /api/users/forgot-password', () => {
        it('should send reset code if email exists', async () => {
            db.query.mockResolvedValueOnce([[mockUser]]); // findByEmail (SELECT)
            db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); // update (UPDATE)
            db.query.mockResolvedValueOnce([[mockUser]]); // update -> findById (SELECT)

            const response = await request(app)
                .post('/api/users/forgot-password')
                .send({ email: mockUser.email });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Reset code sent to your email");
        });
    });
});
