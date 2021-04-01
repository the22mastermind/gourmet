import React from 'react';
import { render } from 'test-utils';
import CartButton from './CartButton';

describe('<CartButton /> component', () => {
  it('renders <CartButton /> component correctly', () => {
    const screen = render(<CartButton items={2} />);
  
    expect(screen.getByTestId('cart-button')).toBeDefined();
    expect(screen.queryByText('2')).toBeDefined();
  });
  
  it('matches <CartButton /> component snapshot', () => {
    const screen = render(<CartButton items={1} />);
  
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
