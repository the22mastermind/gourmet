import cartParser from '../cart';

const contents = [
  {
    id: 1,
    name: 'Item name',
    quantity: 2,
    cost: 6,
    image: 'https://unsplash.com',
    size: 'Medium',
  },
  {
    id: 4,
    name: 'Item name 4',
    quantity: 1,
    cost: 11.50,
    image: 'https://unsplash.com',
    size: 'Large',
  },
  {
    id: 3,
    name: 'Item name 3',
    quantity: 5,
    cost: 15,
    image: 'https://unsplash.com',
    size: 'Small',
  },
];

it('should remove image and size properties from each item in the cart', async () => {
  const parsedCart = await cartParser(contents);

  expect(parsedCart).toBeDefined();
  expect(parsedCart.length).toBe(3);
  expect(parsedCart[0].itemId).toBe(1);
  expect(parsedCart[0].itemName).toBe('Item name');
  expect(parsedCart[0].quantity).toBe(2);
  expect(parsedCart[0].cost).toBe(6);
  expect(parsedCart[0].image).toBeUndefined();
  expect(parsedCart[0].size).toBeUndefined();
});
