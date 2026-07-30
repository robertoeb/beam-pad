module.exports = function (api) {
  api.cache(true);
  const isTest = process.env.NODE_ENV === 'test';
  if (isTest) {
    return {
      presets: ['babel-preset-expo'],
      plugins: ['react-native-reanimated/plugin'],
    };
  }
  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
