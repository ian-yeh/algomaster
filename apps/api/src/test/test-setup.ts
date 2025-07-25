import { beforeAll, afterAll } from '@jest/globals';

beforeAll(async () => {
  // Any global setup (database connections, etc.)
  console.log('Setting up tests...');
});

afterAll(async () => {
  // Any global cleanup
  console.log('Cleaning up tests...');
});