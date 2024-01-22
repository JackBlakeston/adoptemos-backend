import baseConfig from './jest.config.js';

export default {
  ...baseConfig,
  roots: ['<rootDir>/src/tests/e2e'],
  testMatch: ['**/*.e2e.test.ts'],
};
