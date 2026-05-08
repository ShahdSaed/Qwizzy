// Global mock for database configuration matching the real export { db, connectDB }
jest.mock('../../src/config/db', () => ({
    db: {
        query: jest.fn(),
        getConnection: jest.fn()
    },
    connectDB: jest.fn()
}));
