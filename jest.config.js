const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  moduleNameMapper: {
    '^@/modules/(.*)$': '<rootDir>/modules/$1',
    ...expoPreset.moduleNameMapper,
  },
  // Merge @noble into the existing transformIgnorePatterns so ESM packages are transformed
  transformIgnorePatterns: [
    ...(expoPreset.transformIgnorePatterns || []),
  ].map((p) => {
    // Inject @noble into the main negative-lookahead pattern
    if (p.includes('node_modules') && p.includes('(?!')) {
      return p.replace(/(\|@expo)(?:-google-fonts)?/, '$1|@noble');
    }
    return p;
  }),
};
