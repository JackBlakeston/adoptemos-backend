import baseConfig from './jest.config.js';

export default {
  ...baseConfig,
  testPathIgnorePatterns: ['src/tests'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    'src/main.ts',
    'src/config',
    'src/infrastructure/database/seeds',
    'src/infrastructure/database/migrations',
    'src/tests',
  ],
  coverageDirectory: '.jest/coverage',
  coverageReporters: ['lcov', 'text', 'html'],
};
