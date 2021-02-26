import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, render } from 'test-utils';
import HomeScreen from './HomeScreen';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);

describe('<HomeScreen />', () => {
  beforeEach(async () => {
    const userData = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        status: true,
      },
    };
    const token = 'someverylongtoken';
    await AsyncStorage.setItem('auth', JSON.stringify(userData));
    await AsyncStorage.setItem('token', JSON.stringify(token));
  });

  it('renders <HomeScreen /> correctly', async () => {
    const screen = render(<HomeScreen />);
  
    expect(screen.queryByText('Home screen')).toBeTruthy();
    expect(screen.getByTestId ('logout-button')).toBeTruthy();
  });

  it('should not clear storage on logout error', async () => {
    const screen = render(<HomeScreen />);

    mockAxios.onGet(`${baseUrl}/api/auth/logout`).reply(401, { error: 'Invalid token, please login and try again' });
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('logout-button'));
    });
    
    expect(AsyncStorage.clear).not.toHaveBeenCalled();
  });

  it('should clear user info in storage on successful logout', async () => {
    const screen = render(<HomeScreen />);

    mockAxios.onGet(`${baseUrl}/api/auth/logout`).reply(200, { message: 'Logged out successfully' });
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('logout-button'));
    });
    
    expect(AsyncStorage.clear).toHaveBeenCalled();
  });

  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });
});
