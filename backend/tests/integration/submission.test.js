const request = require('supertest');
const app = require('../../app');
const { db } = require('../../src/config/db');
const { mockUser, mockJwtToken } = require('../helpers/testHelpers');
const jwtUtils = require('../../src/utils/jwtUtils');

jest.mock('../../src/utils/jwtUtils');

describe('Submission & Results Integration Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jwtUtils.verifyToken.mockReturnValue({ id: mockUser.id, role: mockUser.role });
    });

    describe('POST /api/quiz-attempts/submit', () => {
        it('should submit quiz and return results', async () => {
            const mockQuestions = [{ id: 'q1', points: 10 }];
            const mockOptions = [{ id: 'o1', question_id: 'q1', is_correct: 1, label: 'Option A' }];
            const mockAttempt = { id: 'att1', user_id: mockUser.id, quiz_id: 'quiz1' };
            const mockAnswer = { id: 'ans1', question_id: 'q1' };
            const mockResult = { id: 'res1', final_score: 10 };
            
            db.query.mockResolvedValueOnce([mockQuestions]); // findByQuizId -> questions
            db.query.mockResolvedValueOnce([mockOptions]);   // findByQuizId -> options
            db.query.mockResolvedValueOnce([{ insertId: 'att1' }]); // create attempt -> INSERT
            db.query.mockResolvedValueOnce([[mockAttempt]]);      // create attempt -> findById (SELECT)
            db.query.mockResolvedValueOnce([{ insertId: 'ans1' }]); // create answer -> INSERT
            db.query.mockResolvedValueOnce([[mockAnswer]]);       // create answer -> findById (SELECT)
            db.query.mockResolvedValueOnce([{ insertId: 'res1' }]); // create result -> INSERT
            db.query.mockResolvedValueOnce([[mockResult]]);       // create result -> findById (SELECT)

            const response = await request(app)
                .post('/api/quiz-attempts/submit')
                .set('Authorization', `Bearer ${mockJwtToken}`)
                .send({
                    quiz_id: 'quiz1',
                    answers: [{ question_id: 'q1', selected_option_id: 'o1' }]
                });

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.data.score).toBe(10);
        });
    });

    describe('GET /api/results/:id', () => {
        it('should return result by id', async () => {
            const mockResult = { id: 'res1', final_score: 10, percentage: 100 };
            db.query.mockResolvedValueOnce([[mockResult]]);

            const response = await request(app)
                .get('/api/results/res1')
                .set('Authorization', `Bearer ${mockJwtToken}`);

            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe('res1');
        });
    });
});
