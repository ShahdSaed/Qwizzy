const request = require('supertest');
const app = require('../../app');
const { db } = require('../../src/config/db');
const { mockInstructor, mockJwtToken } = require('../helpers/testHelpers');
const jwtUtils = require('../../src/utils/jwtUtils');

jest.mock('../../src/utils/jwtUtils');

describe('Admin (Instructor) Actions Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Mock instructor session
        jwtUtils.verifyToken.mockReturnValue({ id: mockInstructor.id, role: 'instructor' });
    });

    describe('POST /api/quizzes', () => {
        it('should allow instructor to create a quiz', async () => {
            const mockQuiz = { id: 'new_quiz_id', title: 'New Admin Quiz' };
            db.query.mockResolvedValueOnce([{ insertId: 'new_quiz_id' }]); // create (INSERT)
            db.query.mockResolvedValueOnce([[mockQuiz]]); // create -> findById (SELECT)

            const response = await request(app)
                .post('/api/quizzes')
                .set('Authorization', `Bearer ${mockJwtToken}`)
                .send({
                    title: 'New Admin Quiz',
                    category_id: '123e4567-e89b-12d3-a456-426614174000',
                    time_limit_minutes: 30
                });

            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
        });
    });

    describe('DELETE /api/quizzes/:id', () => {
        it('should allow instructor to delete a quiz', async () => {
            db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

            const response = await request(app)
                .delete('/api/quizzes/quiz_to_delete')
                .set('Authorization', `Bearer ${mockJwtToken}`);

            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Quiz deleted successfully");
        });
    });
});
