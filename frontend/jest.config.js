module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testRegex: '\\.test\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['/node_modules/'],
};
