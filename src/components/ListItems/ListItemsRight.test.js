import React from 'react';
import { render } from 'test-utils';
import ListItemsRight from './ListItemsRight';

const props = {
  top: 'large',
  bottom: '$4.5',
  color: '#333333',
};

describe('<ListItemsRight /> component', () => {
  it('renders <ListItemsRight /> component correctly', () => {
    const screen = render(<ListItemsRight {...props} />);
  
    expect(screen.getByTestId('list-item-right-wrapper')).toBeDefined();
    expect(screen.getByTestId('list-item-right-top').props.children).toBe('large');
    expect(screen.getByTestId('list-item-right-bottom').props.children).toBe('$4.5');
  });
  
  it('matches <ListItemsRight /> component snapshot', async () => {
    const screen = render(<ListItemsRight {...props} />);
  
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
