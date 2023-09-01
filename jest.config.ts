import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  resetMocks: true,
  rootDir: 'src',
  transform: {
    '^.+\\test.ts$': 'ts-jest',
  },
};
export default config;
