/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
  globalSetup: '<rootDir>/__tests__/jest.setup.ts'
  // globalTeardown: '<rootDir>/__tests__/jest.teardown.ts'
}
