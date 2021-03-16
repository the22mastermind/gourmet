import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { render, fireEvent, waitForElementToBeRemoved } from 'test-utils';
import CartButton from './CartButton';

// eslint-disable-next-line jest/no-disabled-tests
describe.skip('<CartButton /> component', () => {
  it('renders <CartButton /> component correctly', () => {
    const screen = render(<CartButton items={2} />);
  
    expect(screen.getByTestId('cart-button')).toBeDefined();
    expect(screen.queryByText('2')).toBeDefined();
  });
  
  it('should display cart contents correctly', async () => {
    const screen = render(<NavigationContainer><CartButton items={2} /></NavigationContainer>);
    
    fireEvent.press(screen.getByTestId('cart-button'));
  
    await waitForElementToBeRemoved(() => {
      expect(screen.getByTestId('cart-button')).toBeNull();
      expect(screen.queryByText('2')).toBeNull();
      expect(screen.queryByText('Your order')).toBeDefined();
      expect(screen.getByTestId('close-bottom-sheet')).toBeDefined();
    });
  });
  
  it('matches <CartButton /> component snapshot', async () => {
    const screen = render(<CartButton items={1} />);
  
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
