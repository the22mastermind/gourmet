import React from 'react';
import { render } from 'test-utils';
import Loader from './Loader';

describe('<Loader /> component', () => {
  it('renders <Loader /> correctly', () => {
    const screen = render(<Loader />);
  
    expect(screen.getByTestId('loader')).toBeTruthy();
  });
  
  it('matches <Loader /> component snapshot', async () => {
    const screen = render(<Loader />);
  
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
