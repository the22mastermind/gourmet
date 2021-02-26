import React from 'react';
import axios from 'axios';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, render, waitFor } from 'test-utils';
import LoginScreen from './LoginScreen';
import SignupScreen from '../SignupScreen/SignupScreen';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);
const { Navigator, Screen } = createStackNavigator();
const AuthStack = () => (
  <Navigator
    initialRouteName="Login"
    headerMode="none">
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Signup" component={SignupScreen} />
  </Navigator>
);
const props = {
  navigation: {
    navigate: jest.fn(),
  },
};

describe('<LoginScreen />', () => {
  it('renders <LoginScreen /> correctly', async () => {
    const screen = render(<LoginScreen {...props} />);
  
    expect(screen.queryByText('Login to continue')).toBeTruthy();
    expect(screen.getByTestId('phone-number-input')).toBeTruthy();
    expect(screen.getByTestId ('password-input')).toBeTruthy();
    expect(screen.getByTestId ('login-button')).toBeTruthy();
  });

  it('should navigate to signup screen successfully', async () => {
    const screen = render(<NavigationContainer><AuthStack /></NavigationContainer>);

    await act(async () => {
      fireEvent.press(screen.getByTestId ('go-to-signup-button'));
    });

    expect(screen.getByTestId ('signup-button')).toBeTruthy();
    expect(screen.queryByText ('Sign Up')).toBeTruthy();
  });

  it('login should trigger is required validation error', async () => {
    jest.setTimeout(10000);

    const screen = render(<LoginScreen {...props} />);
    
    fireEvent.press(screen.getByTestId ('login-button'));

    await waitFor(async () => {
      expect(await screen.queryByText('Phone number is required')).toBeTruthy();
      expect(await screen.queryByText('Password is required')).toBeTruthy();
    });
  });

  it('should trigger pattern validation errors', async () => {
    jest.setTimeout(10000);

    const screen = render(<LoginScreen {...props} />);

    fireEvent.changeText(screen.getByTestId('phone-number-input'), 'hellothere');
    fireEvent.changeText(screen.getByTestId('password-input'), 'hello');
    
    fireEvent.press(screen.getByTestId ('login-button'));

    await waitFor(async () => {
      expect(await screen.queryByText('Phone number must include country code eg. +250')).toBeTruthy();
      expect(await screen.queryByText('Password length must be between 6 and 20, with at least one number and a symbol')).toBeTruthy();
    });
  });

  it('should trigger network error', async () => {
    jest.setTimeout(10000);

    const screen = render(<LoginScreen {...props} />);

    fireEvent.changeText(screen.getByTestId('phone-number-input'), '+250728884090');
    fireEvent.changeText(screen.getByTestId('password-input'), '@1hello');

    mockAxios.onPost(`${baseUrl}/api/auth/login`).networkError();
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('login-button'));
    });

    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('should save user info in storage on successful login', async () => {
    jest.setTimeout(10000);

    const screen = render(<LoginScreen {...props} />);

    fireEvent.changeText(screen.getByTestId('phone-number-input'), '+250728884090');
    fireEvent.changeText(screen.getByTestId('password-input'), '@1hello');

    const userData = {
      token: 'someverylongtoken',
      data: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        status: true,
      },
    };

    mockAxios.onPost(`${baseUrl}/api/auth/login`).reply(200, userData);
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('login-button'));
    });
    
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });
});
