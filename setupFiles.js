/* eslint-disable global-require */
import 'react-native-gesture-handler/jestSetup';
import { jest } from '@jest/globals';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => ({});
  return Reanimated;
});
