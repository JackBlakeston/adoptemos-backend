import baseConfig from './jest.config.js';

export default {
  ...baseConfig,
  roots: ['<rootDir>/src/tests/integration'],
  testMatch: ['**/*.integration.test.ts'],
};
