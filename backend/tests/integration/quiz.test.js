const request = require('supertest');
const app = require('../../app');
const { db } = require('../../src/config/db');
const { mockUser, mockJwtToken } = require('../helpers/testHelpers');
const jwtUtils = require('../../src/utils/jwtUtils');

jest.mock('../../src/utils/jwtUtils');

describe('Quiz Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jwtUtils.verifyToken.mockReturnValue({ id: mockUser.id, role: mockUser.role });
    });

    describe('GET /api/quizzes', () => {
        it('should return a list of quizzes', async () => {
            const mockQuizzes = [{ id: '1', title: 'Quiz 1' }, { id: '2', title: 'Quiz 2' }];
            db.query.mockResolvedValueOnce([mockQuizzes]);

            const response = await request(app)
                .get('/api/quizzes')
                .set('Authorization', `Bearer ${mockJwtToken}`);

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.length).toBe(2);
        });
    });
});
