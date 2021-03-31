import React from 'react';
import axios from 'axios';
import { NavigationContainer} from '@react-navigation/native';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { render, waitFor } from 'test-utils';
import OrdersStack from '../../navigation/stacks/OrdersStack';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);
const ordersData = [
  {
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
  },
  {
    id: 2,
    total: 11.00,
    status: 'completed',
    paymentId: 'abcdefgh',
    userId: 2,
    Contents: [
      { itemId: 1, itemName: 'BBQ Pizza', cost: 11.00, quantity: 1 },
    ],
    createdAt: new Date(),
  },
];

describe('<OrdersListScreen />', () => {
  beforeAll(async () => {
    const token = 'someverylongtoken';
    await AsyncStorage.setItem('token', JSON.stringify(token));
  });
  it('renders empty <OrdersListScreen /> correctly', async () => {
    mockAxios.onGet(`${baseUrl}/api/orders`).reply(404, { data: [] });

    const screen = render(<NavigationContainer><OrdersStack /></NavigationContainer>);

    await waitFor(() => {
      expect(screen.getByTestId ('no-data-found').props.children).toBe('No orders found at the moment.');
    });
  });

  it('renders <OrdersListScreen /> with 2 orders', async () => {
    mockAxios.onGet(`${baseUrl}/api/orders`).reply(200, { data: ordersData });

    const screen = render(<NavigationContainer><OrdersStack /></NavigationContainer>);
  
    await waitFor(() => {
      expect(screen.getByTestId ('3')).toBeDefined();
      expect(screen.queryByText('Order #3')).toBeDefined();
      expect(screen.queryByText('2 items')).toBeDefined();
      expect(screen.queryByText(/pending/i)).toBeDefined();
      expect(screen.getByTestId ('2')).toBeDefined();
      expect(screen.queryByText('Order #2')).toBeDefined();
      expect(screen.queryByText('1 items')).toBeDefined();
      expect(screen.queryByText(/accepted/i)).toBeDefined();
    });
  });

  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });
});
