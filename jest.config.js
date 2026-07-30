const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/theme/**'],
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
