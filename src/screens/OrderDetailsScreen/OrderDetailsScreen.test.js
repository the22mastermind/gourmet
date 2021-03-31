import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, waitFor } from 'test-utils';
import OrderDetailsScreen from './OrderDetailsScreen';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);
const orderData = {
  id: 3,
  total: 9.5,
  status: 'pending',
  paymentId: 'abcdef',
  userId: 2,
  Contents: [
    { itemId: 1, itemName: 'French Omelette De Fromage', cost: 8.00, quantity: 2 },
    { itemId: 5, itemName: 'The best Cappucinno in town.', cost: 1.50, quantity: 1 },
  ],
  createdAt: new Date(),
};
const props = {
  route: {
    params: { orderId: 3 },
  },
};

describe('<OrderDetailsScreen />', () => {
  beforeAll(async () => {
    const token = 'someverylongtoken';
    await AsyncStorage.setItem('token', JSON.stringify(token));
  });
  it('should display a single order', async () => {
    // jest.setTimeout(10000);

    mockAxios.onGet(`${baseUrl}/api/orders/3`).reply(200, { data: orderData });

    const screen = render(<OrderDetailsScreen {...props} />);
  
    await waitFor(() => {
      expect(screen.queryByText('#3')).toBeDefined();
      expect(screen.queryByText('Pending')).toBeDefined();
      expect(screen.queryByText('2 x French Omelette De Fromage')).toBeTruthy();
      expect(screen.queryByText('1 x The best Cappucinno in town.')).toBeTruthy();
      expect(screen.queryByText('$9.5')).toBeTruthy();
    });
  });

  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });
});
