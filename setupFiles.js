/* eslint-disable global-require */
import 'react-native-gesture-handler/jestSetup';
import { jest } from '@jest/globals';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.addWhitelistedUIProps = () => {};
  Reanimated.default.addWhitelistedNativeProps = () => {};
  return Reanimated;
});
jest.mock('react-native-stripe-payments', () => {
  const stripe = {
    setOptions: () => {},
    isCardValid: () => {},
    confirmPayment: () => ({ id: 'payment-id' }),
  };
  return stripe;
});
