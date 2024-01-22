const isEndToEndTest = process.argv.some((arg) => arg.includes('e2e'));

const setupFilesAfterEnv = isEndToEndTest ? ['<rootDir>/src/tests/testEnvironment/SetupEndToEndEnv.ts'] : [];

export default {
  testTimeout: 20000,
  testEnvironment: 'node',
  rootDir: '../',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest'],
  },
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv,
};
