const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/theme/**',
    '!src/proto/**',
    '!src/**/types.ts',
    '!src/test/**',
  ],
  coverageReporters: ['json-summary', 'lcov', 'text'],
  // Coverage gates (TASK_17): all buckets green as of the branch-gap
  // closing pass. Never lower them; raise when new suites add headroom.
  coverageThreshold: {
    global: { statements: 88, branches: 78, functions: 84, lines: 89 },
    './src/protocol/': { statements: 92, branches: 85, functions: 90, lines: 93 },
    './src/services/': { statements: 90, branches: 82, functions: 88, lines: 90 },
    './src/stores/': { statements: 95, branches: 88, functions: 95, lines: 95 },
    './src/components/': { statements: 86, branches: 72, functions: 82, lines: 87 },
    './src/app/': { statements: 80, branches: 72, functions: 78, lines: 80 },
  },
  moduleNameMapper: {
    '^@/modules/(.*)$': '<rootDir>/modules/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    ...expoPreset.moduleNameMapper,
  },
  transformIgnorePatterns: [...(expoPreset.transformIgnorePatterns || [])].map((p) => {
    if (p.includes('node_modules') && p.includes('(?!')) {
      return p.replace(/(\|@expo)(?:-google-fonts)?/, '$1|@noble|lucide-react-native');
    }
    return p;
  }),
};
