const cartParser = (cart) => {
  const parsedCart = [];
  cart.forEach(item => {
    const newItem = {
      itemId: item.id,
      itemName: item.name,
      quantity: item.quantity,
      cost: item.cost,
    };
    parsedCart.push(newItem);
  });
  return parsedCart;
};

export default cartParser;
