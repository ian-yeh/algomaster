import type { Config } from 'jest';

const config: Config = {
  displayName: '@algomaster/api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: 'test-output/jest/coverage',
  testMatch: ['<rootDir>/src/test/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test/test-setup.ts'],
  moduleNameMapper: {
    // Handle Express internal modules
    //'^router$': '<rootDir>/node_modules/express/lib/router/index.js',
    '^router$': 'express/lib/router'
  },
}

export default config;