import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, render } from 'test-utils';
import AccountScreen from './AccountScreen';
import AccountStack from '../../navigation/stacks/AccountStack';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);

describe('<AccountScreen />', () => {
  beforeEach(async () => {
    const userData = {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+250731237410',
        address: 'Kigali, Rwanda',
        createdAt: new Date(),
        Orders: [],
        role: 'customer',
        status: true,
      },
    };
    const token = 'someverylongtoken';
    await AsyncStorage.setItem('auth', JSON.stringify(userData));
    await AsyncStorage.setItem('token', JSON.stringify(token));
  });

  it('renders <HomeScreen /> correctly', async () => {
    const screen = render(
      <NavigationContainer>
        <AccountStack />
      </NavigationContainer>
  );
  
    expect(screen.queryByText('Name')).toBeTruthy();
    expect(screen.queryByText('Phone')).toBeTruthy();
    expect(screen.queryByText('Address')).toBeTruthy();
    expect(screen.getByTestId ('logout-button')).toBeTruthy();
  });

  it('should not clear storage on logout error', async () => {
    const screen = render(<AccountScreen />);

    mockAxios.onGet(`${baseUrl}/api/auth/logout`).reply(401, { error: 'Invalid token, please login and try again' });
    
    await act(async () => {
      fireEvent.press(screen.getByTestId ('logout-button'));
    });
    
    expect(AsyncStorage.clear).not.toHaveBeenCalled();
  });

  it('should clear user info in storage on successful logout', async () => {
    const screen = render(<AccountScreen />);

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
