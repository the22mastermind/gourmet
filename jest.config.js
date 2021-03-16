const path = require('path');

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  setupFiles: ['./setupFiles.js'],
  testPathIgnorePatterns: [
    'e2e',
  ],
  moduleDirectories: [
    'node_modules',
    path.join(__dirname),
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|react-navigation|@react-navigation|react-native-paper|react-native-stripe-payments|react-native-credit-card-input)',
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
