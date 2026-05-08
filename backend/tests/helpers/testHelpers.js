const mockUser = {
    id: '1',
    email: 'test@email.com',
    full_name: 'Test User',
    password_hash: 'hashed_password',
    role: 'user',
    is_verified: 1
};

const mockInstructor = {
    id: '2',
    email: 'instructor@email.com',
    full_name: 'Instructor User',
    password_hash: 'hashed_password',
    role: 'instructor',
    is_verified: 1
};

const mockJwtToken = 'mock_jwt_token';

module.exports = {
    mockUser,
    mockInstructor,
    mockJwtToken
};
