module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react-hooks'],
  rules: {
    'prettier/prettier': 1,
    'react-hooks/exhaustive-deps': 0,
    'react/no-unstable-nested-components': 0,
  },
};
