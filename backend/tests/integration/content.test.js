const request = require('supertest');
const app = require('../../app');
const { db } = require('../../src/config/db');
const { mockInstructor, mockJwtToken } = require('../helpers/testHelpers');
const jwtUtils = require('../../src/utils/jwtUtils');

jest.mock('../../src/utils/jwtUtils');

describe('Content Management (Categories & Questions) Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jwtUtils.verifyToken.mockReturnValue({ id: mockInstructor.id, role: 'instructor' });
    });

    describe('GET /api/categories', () => {
        it('should return all categories', async () => {
            db.query.mockResolvedValueOnce([[{ id: 'cat1', name: 'Science' }]]);
            const response = await request(app)
                .get('/api/categories')
                .set('Authorization', `Bearer ${mockJwtToken}`);
            expect(response.status).toBe(200);
            expect(response.body.data[0].name).toBe('Science');
        });
    });

    describe('POST /api/questions', () => {
        it('should allow instructor to create a question', async () => {
            const mockQuestion = { id: 'q1', content: 'What is 2+2?' };
            db.query.mockResolvedValueOnce([{ insertId: 'q1' }]); // create (INSERT)
            db.query.mockResolvedValueOnce([[mockQuestion]]); // create -> findById (SELECT)

            const response = await request(app)
                .post('/api/questions')
                .set('Authorization', `Bearer ${mockJwtToken}`)
                .send({
                    quiz_id: 'quiz1',
                    body: 'What is 2+2?',
                    question_type: 'MCQ',
                    points: 5
                });
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
        });
    });
});
