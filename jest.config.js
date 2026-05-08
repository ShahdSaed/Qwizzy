module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/backend/tests/setup/jest.setup.js'],
    testMatch: ['**/tests/**/*.test.js'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true
};
