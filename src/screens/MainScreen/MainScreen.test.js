import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, fireEvent, render, waitFor, within } from 'test-utils';
import Routes from '../../navigation/Routes';
import { baseUrl } from '../../utils/api';

const mockAxios = new MockAdapter(axios);
const menuData = [
  {
    id: 1,
    name: 'Breakfast',
    Items: [
      {
        menuId: 1,
        id: 1,
        name: 'French Omelette De Fromage',
        description: 'Our famous Omelette De Fromage with lots of Cheese.',
        cost: 4.00,
        size: 'Medium',
        image: 'https://media.istockphoto.com/photos/omelette-picture-id155375267',
      },
    ],
  },
  {
    id: 2,
    name: 'Lunch/Dinner',
    Items: [
      {
        menuId: 2,
        id: 2,
        name: 'Double Cheese Burger',
        description: 'This is a very tasty cheese burger.',
        cost: 6.50,
        size: 'Large',
        image: 'https://media.istockphoto.com/photos/delicious-fresh-cooked-burger-with-a-side-of-french-fries-picture-id177556385',
      },
    ],
  },
  {
    id: 3,
    name: 'Drinks',
    Items: [
      {
        menuId: 3,
        id: 3,
        name: 'Espresso',
        description: 'This is a very tasty espresso.',
        cost: 3.50,
        size: 'Small',
        image: 'https://media.istockphoto.com/photos/delicious-fresh-cooked-burger-with-a-side-of-french-fries-picture-id177556385',
      },
    ],
  },
];

describe('<MainScreen />', () => {
  beforeEach(async () => {
    const userData = {
      firstName: 'John',
      lastName: 'Doe',
      role: 'customer',
      address: 'Kigali, Rwanda',
      status: true,
    };
    const token = 'someverylongtoken';
    await AsyncStorage.setItem('auth', JSON.stringify(userData));
    await AsyncStorage.setItem('token', JSON.stringify(token));
  });
  afterEach(() => {
    mockAxios.reset();
  });
  afterAll(() => {
    mockAxios.reset();
    mockAxios.restore();
  });

  it('renders the <MainScreen /> with empty menu', async () => {
    jest.setTimeout(20000);
    mockAxios.onGet(`${baseUrl}/api/menu`).reply(404, { data: [] });
    const screen = render(<Routes />);

    await waitFor(() => {
      expect(screen.queryByText('Welcome, John')).toBeTruthy();
      expect(screen.queryByText('Kigali, Rwanda')).toBeTruthy();
      expect(screen.queryByText(/Breakfast/i)).toBeTruthy();
      expect(screen.queryByText('LUNCH/DINNER')).toBeTruthy();
      expect(screen.queryByText(/Drinks/i)).toBeTruthy();
      expect(screen.queryAllByText('Items not found').length).toBe(3);
    });
  });

  it('Authentication error on fetching the menu', async () => {
    mockAxios.onGet(`${baseUrl}/api/menu`).reply(401, { error: 'Invalid token, please login' });
    const screen = render(<Routes />);

    await waitFor(() => {
      const alert = screen.getByTestId('snackbar');
      expect(within(alert).queryByText('Invalid token, please login')).toBeTruthy();
      // Should be redirected to login screen
      expect(screen.queryByText('Login to continue')).toBeTruthy();
    });
  });

  it('renders <MainScreen /> with menu', async () => {
    jest.setTimeout(20000);
    mockAxios.onGet(`${baseUrl}/api/menu`).reply(200, { data: menuData });
    const screen = render(<Routes />);
  
    await waitFor(() => {
      expect(screen.getByTestId('breakfast-tab')).toBeTruthy();
      expect(screen.getByTestId('lunch-dinner-tab')).toBeTruthy();
      expect(screen.getByTestId('drinks-tab')).toBeTruthy();
      expect(within(screen.getByTestId('breakfast-tab')).getByTestId('1')).toBeTruthy();
      expect(within(screen.getByTestId('breakfast-tab')).queryByText('French Omelette De Fromage')).toBeTruthy();
      expect(within(screen.getByTestId('breakfast-tab')).queryByText('Our famous Omelette De Fromage with lots of Cheese.')).toBeTruthy();
      expect(within(screen.getByTestId('breakfast-tab')).queryByText('Medium')).toBeTruthy();
      expect(within(screen.getByTestId('breakfast-tab')).queryByText('$4')).toBeTruthy();
    });

    // Add item to cart
    await act(async () => {
      fireEvent.press(within(screen.getByTestId('breakfast-tab')).queryByText('French Omelette De Fromage'));
    });

    // Snackbar alert
    expect(within(screen.getByTestId('snackbar')).queryByText('French Omelette De Fromage added to cart successfully')).toBeTruthy();
    expect(screen.getByTestId('cart-button')).toBeTruthy();
    expect(within(screen.getByTestId('cart-button')).queryByText('1')).toBeTruthy();

    // Add same item to cart (updates the item quantity in the cart)
    await act(async () => {
      fireEvent.press(within(screen.getByTestId('breakfast-tab')).queryByText('French Omelette De Fromage'));
    });

    // Snackbar alert
    expect(within(screen.getByTestId('snackbar')).queryByText('Cart updated successfully')).toBeTruthy();
    expect(screen.getByTestId('cart-button')).toBeTruthy();
    expect(within(screen.getByTestId('cart-button')).queryByText('1')).toBeTruthy();

    // Show cart
    await act(async () => {
      fireEvent.press(screen.getByTestId('cart-button'));
    });

    // cart contents should be visible
    expect(screen.queryByText('Your order')).toBeTruthy();
    expect(screen.queryByText('2 x French Omelette De Fromage')).toBeTruthy();
    expect(screen.queryByText('Pay $8')).toBeTruthy();

    // Close cart
    await act(async () => {
      fireEvent.press(screen.getByTestId('close-bottom-sheet'));
    });

    // cart contents should NOT be visible
    expect(screen.queryByText('Your order')).toBeFalsy();
    expect(screen.queryByText('2 x French Omelette De Fromage')).toBeFalsy();
    expect(screen.queryByText('Pay $8')).toBeFalsy();

    // Cart button should be visible again
    expect(screen.getByTestId('cart-button')).toBeTruthy();

    // Show cart
    await act(async () => {
      fireEvent.press(screen.getByTestId('cart-button'));
    });

    // Remove item from cart
    await act(async () => {
      fireEvent.press(screen.queryByText('2 x French Omelette De Fromage'));
    });

    // Cart should be closed and menu should be visible
    expect(within(screen.getByTestId('breakfast-tab')).queryByText('French Omelette De Fromage')).toBeTruthy();

    // Add item to cart, open cart and navigate to payment screen
    await act(async () => {
      fireEvent.press(within(screen.getByTestId('breakfast-tab')).queryByText('French Omelette De Fromage'));
    });
    await act(async () => {
      fireEvent.press(screen.getByTestId('cart-button'));
    });
    await act(async () => {
      fireEvent.press(screen.queryByText('Pay $4'));
    });
    screen.update(<Routes />);
    expect(screen.queryByText('Confirm your order')).toBeTruthy();
  });
});
