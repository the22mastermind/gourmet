import React from 'react';
import { render } from 'test-utils';
import CustomTitle from './CustomTitle';

describe('<CustomTitle /> component', () => {
  it('renders <CustomTitle /> correctly', () => {
    const screen = render(<CustomTitle text="This is a title" />);
  
    expect(screen.getByTestId('title')).toBeTruthy();
    expect(screen.queryByText('This is a title')).toBeTruthy();
  });
  
  it('matches <CustomTitle /> component snapshot', async () => {
    const screen = render(<CustomTitle text="This is a title" />);
  
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
