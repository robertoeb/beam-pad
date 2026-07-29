const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '^@/modules/(.*)$': '<rootDir>/modules/$1',
    ...expoPreset.moduleNameMapper,
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@noble|react-native|expo|@react-native|@expo|lucide-react-native)/)',
  ],
};
