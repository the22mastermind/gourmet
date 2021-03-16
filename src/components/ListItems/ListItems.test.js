import React from 'react';
import { render, fireEvent } from 'test-utils';
import ListItems from './ListItems';

const menu = {
  items: [
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
  handleItem: jest.fn(),
};

describe('<ListItems /> component', () => {
  it('renders a menu <ListItems /> component correctly', () => {
    const screen = render(<ListItems {...menu} />);
  
    expect(screen.getByTestId(menu.items[0].name)).toBeDefined();
    expect(screen.queryByText('Double Cheese Burger')).toBeDefined();
    expect(screen.queryByText('This is a very tasty cheese burger.')).toBeDefined();
    expect(screen.getByTestId('item-image')).toBeDefined();
    expect(screen.getByTestId('list-item-right-wrapper')).toBeDefined();
    expect(screen.getByTestId('list-item-right-top').props.children).toBe('Large');
    expect(screen.getByTestId('list-item-right-bottom').props.children).toBe('$6.5');
  });
  
  it('calls the onPress event correctly', async () => {
    const screen = render(<ListItems {...menu} />);

    fireEvent.press(screen.getByTestId(menu.items[0].name));
  
    expect(menu.handleItem).toHaveBeenCalledWith(menu.items[0]);
  });
  
  it('matches <ListItems /> component snapshot', async () => {
    const screen = render(<ListItems {...menu} />);
  
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
