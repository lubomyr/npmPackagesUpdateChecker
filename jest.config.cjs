const {setupFiles, transform} = require('@react-native/jest-preset');

module.exports = {
  preset: '@react-native/jest-preset',
  transform: {
    ...transform,
    // The preset's pattern covers js/ts/tsx but not jsx, which the components use.
    '^.+\\.jsx$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native[\\w-]*|@react-navigation|react-native-.*)/)',
  ],
  // The stack navigator schedules card animations on a timer that would
  // otherwise fire after the environment is torn down and crash the run.
  fakeTimers: {enableGlobally: true},
  setupFiles: [
    ...setupFiles,
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
};
