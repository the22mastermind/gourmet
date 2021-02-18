const path = require('path');

module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: [
    'node_modules',
    path.join(__dirname),
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  clearMocks: true,
};
