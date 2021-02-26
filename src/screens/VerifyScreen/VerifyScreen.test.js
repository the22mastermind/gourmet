import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, render, waitFor } from 'test-utils';
import VerifyScreen from './VerifyScreen';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);
const props = {
  navigation: {
    reset: jest.fn(),
  },
};

describe('<VerifyScreen />', () => {
  beforeEach(async () => {
    const signupData = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'admin',
      otp: '111222',
      status: false,
    };
    const token = 'someverylongtoken';
    await AsyncStorage.setItem('signup', JSON.stringify(signupData));
    await AsyncStorage.setItem('token', JSON.stringify(token));
  });

  it('renders <VerifyScreen /> correctly', async () => {
    const screen = render(<VerifyScreen {...props} />);

    await waitFor(() => {
      expect(screen.queryByText('Verify your account')).toBeTruthy();
      expect(screen.getAllByTestId ('otp-code-input').length).toBe(6);
      expect(screen.getByTestId ('resend-otp-button')).toBeTruthy();
    });
  });

  it('should trigger network error', async () => {
    const screen = render(<VerifyScreen {...props} />);

    mockAxios.onPost(`${baseUrl}/api/auth/verify`).networkError();
    
    await act(async () => {
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[0] , '1');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[1] , '2');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[2] , '3');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[3] , '4');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[4] , '5');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[5] , '6');
    });

    expect(props.navigation.reset).not.toHaveBeenCalled();
    expect(screen.queryByText('Verify your account')).toBeTruthy();
  });

  it('should trigger resend otp error', async () => {
    const screen = render(<VerifyScreen {...props} />);

    mockAxios.onGet(`${baseUrl}/api/auth/verify/retry`).reply(401, { error: 'Invalid token, please login and try again' });
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('resend-otp-button'));
    });

    expect(props.navigation.reset).not.toHaveBeenCalled();
    expect(screen.queryByText('Verify your account')).toBeTruthy();
  });

  it('should resend otp successfully', async () => {
    const screen = render(<VerifyScreen {...props} />);

    mockAxios.onGet(`${baseUrl}/api/auth/verify/retry`).reply(200, { message: 'OTP sent successfully' });
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('resend-otp-button'));
    });

    expect(props.navigation.reset).not.toHaveBeenCalled();
    expect(screen.queryByText('Verify your account')).toBeTruthy();
  });

  it('should trigger error when invalid otp is entered', async () => {
    const screen = render(<VerifyScreen {...props} />);

    await act(async () => {
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[0], '1');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[1], '2');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[2], '3');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[3], '4');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[4], '5');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[5], '6');
    });

    expect(screen.getAllByTestId('otp-code-input')[0].props.value).toBe('');
    expect(props.navigation.reset).not.toHaveBeenCalled();
  });

  it('should verify user account successfully and trigger navigation to login screen', async () => {
    const screen = render(<VerifyScreen {...props} />);

    const mockedResponse = {
      message: 'Verification successful',
      data: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        status: true,
      },
    };

    mockAxios.onPost(`${baseUrl}/api/auth/verify`).reply(200, mockedResponse);
    
    await act(async () => {
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[0], '1');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[1], '1');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[2], '1');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[3], '2');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[4], '2');
      fireEvent.changeText(screen.getAllByTestId('otp-code-input')[5], '2');
    });
    
    expect(props.navigation.reset).toHaveBeenCalled();
  });

  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });
});
