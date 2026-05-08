const { authenticate, authorizeAdmin } = require('../../../src/middleware/authMiddleware');
const jwtUtils = require('../../../src/utils/jwtUtils');
const AppError = require('../../../src/utils/AppError');

jest.mock('../../../src/utils/jwtUtils');

describe('Auth Middleware (Unit)', () => {
    let req, res, next;

    beforeEach(() => {
        req = { headers: {} };
        res = {};
        next = jest.fn();
        jest.clearAllMocks();
    });

    describe('authenticate', () => {
        it('should return 401 if no token provided (Edge Case)', () => {
            authenticate(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(AppError));
            expect(next.mock.calls[0][0].statusCode).toBe(401);
        });

        it('should return 401 if token is invalid (Edge Case)', () => {
            req.headers.authorization = 'Bearer invalid';
            jwtUtils.verifyToken.mockReturnValue(null);
            
            authenticate(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(AppError));
            expect(next.mock.calls[0][0].message).toBe('Invalid or expired token.');
        });

        it('should call next and attach user if token is valid', () => {
            req.headers.authorization = 'Bearer valid_token';
            const mockPayload = { id: '1', role: 'user' };
            jwtUtils.verifyToken.mockReturnValue(mockPayload);

            authenticate(req, res, next);
            expect(req.user).toEqual(mockPayload);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('authorizeAdmin (Instructor)', () => {
        it('should call next if user is instructor', () => {
            req.user = { role: 'instructor' };
            authorizeAdmin(req, res, next);
            expect(next).toHaveBeenCalled();
        });

        it('should return 403 if user is not instructor (Edge Case)', () => {
            req.user = { role: 'user' };
            authorizeAdmin(req, res, next);
            expect(next).toHaveBeenCalledWith(expect.any(AppError));
            expect(next.mock.calls[0][0].statusCode).toBe(403);
        });
    });
});
