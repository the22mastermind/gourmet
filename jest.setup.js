import '@testing-library/jest-native/extend-expect';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { jest } from '@jest/globals';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
global.window = {}
global.window = global
