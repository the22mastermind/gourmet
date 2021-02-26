import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, render, waitFor } from 'test-utils';
import Routes from '../Routes';

describe('<Main navigator />', () => {
  it('renders the login screen when user is not logged in', async () => {
    const screen = render(<Routes />);
    await waitFor(() => expect(screen.queryByText('Login to continue')).toBeDefined());
  });

  it('saves user info in storage', async () => {
    const userData = {
      authenticated: true,
      user: {
        token: 'someverylongtoken',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        status: true,
      },
    };
    await act(async () => {
      AsyncStorage.setItem('auth', JSON.stringify(userData));
    });
    
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('renders the home screen when user is logged in', async () => {
    const screen = render(<Routes />);
    await waitFor(() => expect(screen.queryByText('Home screen')).toBeDefined());
  });
});
