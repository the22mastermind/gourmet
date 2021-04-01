import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act, fireEvent, render, waitFor } from 'test-utils';
import PaymentScreen from './PaymentScreen';

const mockAxios = new MockAdapter(axios);

const props = {
  navigation: {
    navigate: jest.fn(),
    reset: jest.fn(),
  },
  route: {
    params: {
      total: 10,
    }
  }
};

describe('<PaymentScreen />', () => {
  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });
  it('renders <PaymentScreen /> correctly', async () => {
    const screen = render(<PaymentScreen {...props} />);
  
    await waitFor(() => {
      expect(screen.getByTestId('title').props.children).toBe('Confirm your order');
      expect(screen.getByTestId('payment-cards')).toBeTruthy();
      expect(screen.queryByText('Pay $10')).toBeTruthy();
    });
  });
  
  it('should display the credit card form', async () => {
    const screen = render(<PaymentScreen {...props} />);
  
    await waitFor(() => {
      expect(screen.getByTestId('title').props.children).toBe('Confirm your order');
      expect(screen.getByTestId('payment-cards')).toBeTruthy();
      expect(screen.queryByText('Pay $10')).toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(screen.queryByText('Pay $10'));
    });

    expect(screen.queryByText(/card number/i)).toBeTruthy();
    expect(screen.queryByText(/expiry/i)).toBeTruthy();
    expect(screen.queryByText('CVC/CCV')).toBeTruthy();
  });
});
