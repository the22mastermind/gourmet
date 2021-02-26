import React from 'react';
import axios from 'axios';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, render, waitFor } from 'test-utils';
import SignupScreen from './SignupScreen';
import VerifyScreen from '../VerifyScreen/VerifyScreen';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);
const { Navigator, Screen } = createStackNavigator();
const AuthStack = () => (
  <Navigator
    initialRouteName="Signup"
    headerMode="none">
    <Screen name="Signup" component={SignupScreen} />
    <Screen name="Verify" component={VerifyScreen} />
  </Navigator>
);
const props = {
  navigation: {
    reset: jest.fn(),
  },
};

describe('<SignupScreen />', () => {
  it('renders <SignupScreen /> correctly', async () => {
    const screen = render(<SignupScreen {...props} />);
  
    expect(screen.queryByText('Create an account')).toBeTruthy();
    expect(screen.getByTestId('firstname-input')).toBeTruthy();
    expect(screen.getByTestId('lastname-input')).toBeTruthy();
    expect(screen.getByTestId('phone-number-input')).toBeTruthy();
    expect(screen.getByTestId('address-input')).toBeTruthy();
    expect(screen.getByTestId ('password-input')).toBeTruthy();
    expect(screen.getByTestId ('signup-button')).toBeTruthy();
  });

  it('should trigger is required validation errors', async () => {
    const screen = render(<SignupScreen {...props} />);
    
    fireEvent.press(screen.getByTestId ('signup-button'));

    await waitFor(async () => {
      expect(await screen.queryByText('First name is required')).toBeTruthy();
      expect(await screen.queryByText('Last name is required')).toBeTruthy();
      expect(await screen.queryByText('Phone number is required')).toBeTruthy();
      expect(await screen.queryByText('Address is required')).toBeTruthy();
      expect(await screen.queryByText('Password is required')).toBeTruthy();
    });
  });

  it('should trigger pattern validation errors', async () => {
    const screen = render(<SignupScreen {...props} />);

    fireEvent.changeText(screen.getByTestId('firstname-input'), 'hi');
    fireEvent.changeText(screen.getByTestId('lastname-input'), 'hi');
    fireEvent.changeText(screen.getByTestId('phone-number-input'), 'hellothere');
    fireEvent.changeText(screen.getByTestId('address-input'), '1');
    fireEvent.changeText(screen.getByTestId('password-input'), 'hello');
    
    fireEvent.press(screen.getByTestId ('signup-button'));

    await waitFor(async () => {
      expect(await screen.queryByText('First name must contain only letters and length must be between 3 and 30 characters')).toBeTruthy();
      expect(await screen.queryByText('Last name must contain only letters and length must be between 3 and 30 characters')).toBeTruthy();
      expect(await screen.queryByText('Phone number must include country code eg. +250')).toBeTruthy();
      expect(await screen.queryByText('Address length must be between 3 and 30 characters')).toBeTruthy();
      expect(await screen.queryByText('Password length must be between 6 and 20, with at least one number and a symbol')).toBeTruthy();
    });
  });

  it('should trigger network error', async () => {
    const screen = render(<SignupScreen {...props} />);

    fireEvent.changeText(screen.getByTestId('firstname-input'), 'John');
    fireEvent.changeText(screen.getByTestId('lastname-input'), 'Doe');
    fireEvent.changeText(screen.getByTestId('phone-number-input'), '+250728884090');
    fireEvent.changeText(screen.getByTestId('address-input'), 'KN 2 Ave, 10, Appt. 20');
    fireEvent.changeText(screen.getByTestId('password-input'), '@1hello');

    mockAxios.onPost(`${baseUrl}/api/auth/signup`).networkError();
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('signup-button'));
    });

    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
  });

  it('should save user info and token in storage on successful signup and navigate to verify screen', async () => {
    const screen = render(<NavigationContainer><AuthStack /></NavigationContainer>);

    fireEvent.changeText(screen.getByTestId('firstname-input'), 'John');
    fireEvent.changeText(screen.getByTestId('lastname-input'), 'Doe');
    fireEvent.changeText(screen.getByTestId('phone-number-input'), '+250728884090');
    fireEvent.changeText(screen.getByTestId('address-input'), 'KN 2 Ave, 10, Appt. 20');
    fireEvent.changeText(screen.getByTestId('password-input'), '@1hello');

    const userData = {
      token: 'someverylongtoken',
      data: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'customer',
        status: false,
      },
    };

    mockAxios.onPost(`${baseUrl}/api/auth/signup`).reply(201, userData);
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('signup-button'));
    });
    
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
    expect(screen.queryByText('Verify your account')).toBeTruthy();
    expect(screen.queryByText('Enter the 6 digit code sent to your phone number')).toBeTruthy();
    expect(screen.getByTestId ('resend-otp-button')).toBeTruthy();
  });

  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });
});
