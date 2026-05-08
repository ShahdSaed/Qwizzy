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

    describe('POST /api/users/verify-forgot-password-code', () => {
        it('should verify reset code and set verified flag', async () => {
            const userWithCode = { ...mockUser, reset_password_code: '1234', reset_password_expires: new Date(Date.now() + 3600000) };
            db.query.mockResolvedValueOnce([[userWithCode]]); // findByResetCode (SELECT)
            db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); // update is_reset_verified (UPDATE)
            db.query.mockResolvedValueOnce([[userWithCode]]); // update -> findById (SELECT)

            const response = await request(app)
                .post('/api/users/verify-forgot-password-code')
                .send({
                    email: mockUser.email,
                    code: '1234'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Code is valid");
        });
    });

    describe('POST /api/users/reset-password', () => {
        it('should fail if reset code was not verified (is_reset_verified is 0)', async () => {
            const userWithCodeNotVerified = { 
                ...mockUser, 
                reset_password_code: '1234', 
                reset_password_expires: new Date(Date.now() + 3600000),
                is_reset_verified: 0 
            };
            db.query.mockResolvedValueOnce([[userWithCodeNotVerified]]); // findByEmail (SELECT)

            const response = await request(app)
                .post('/api/users/reset-password')
                .send({
                    email: mockUser.email,
                    newPassword: 'new_password123'
                });

            expect(response.status).toBe(403);
            expect(response.body.message).toMatch(/verify the code first/);
        });

        it('should succeed if reset code was verified (is_reset_verified is 1)', async () => {
            const userVerified = { 
                ...mockUser, 
                reset_password_code: '1234', 
                reset_password_expires: new Date(Date.now() + 3600000),
                is_reset_verified: 1 
            };
            db.query.mockResolvedValueOnce([[userVerified]]); // findByEmail (SELECT)
            db.query.mockResolvedValueOnce([{ affectedRows: 1 }]); // update password (UPDATE)
            db.query.mockResolvedValueOnce([[userVerified]]); // update -> findById (SELECT)

            const response = await request(app)
                .post('/api/users/reset-password')
                .send({
                    email: mockUser.email,
                    newPassword: 'new_password123'
                });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Password reset successfully");
        });
    });
});
