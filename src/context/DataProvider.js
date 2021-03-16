import React, { createContext, useReducer } from 'react';
import DataReducer from './reducers/DataReducer';

const initialState = {
  // menu: [
  //   {
  //     menuId: 1,
  //     id: 1,
  //     name: 'French Omelette De Fromage',
  //     description: 'Our famous Omelette De Fromage with lots of Cheese.',
  //     cost: 4.00,
  //     size: 'Medium',
  //     image: 'https://media.istockphoto.com/photos/omelette-picture-id155375267',
  //   },
  //   {
  //     menuId: 2,
  //     id: 2,
  //     name: 'Double Cheese Burger',
  //     description: 'This is a very tasty cheese burger.',
  //     cost: 6.50,
  //     size: 'Large',
  //     image: 'https://media.istockphoto.com/photos/delicious-fresh-cooked-burger-with-a-side-of-french-fries-picture-id177556385',
  //   },
  //   {
  //     menuId: 2,
  //     id: 3,
  //     name: 'Chicken Pizza',
  //     description: 'This is a very tasty Pizza.',
  //     cost: 9.00,
  //     size: 'Large',
  //     image: 'https://media.istockphoto.com/photos/delicious-vegetarian-pizza-on-white-picture-id1192094401',
  //   },
  //   {
  //     menuId: 3,
  //     id: 4,
  //     name: 'Diet Coke',
  //     description: 'Diet Coke without added sugar.',
  //     cost: 1.50,
  //     size: 'Small',
  //     image: 'https://media.istockphoto.com/photos/can-of-cocacola-on-ice-picture-id487787108',
  //   },
  //   {
  //     menuId: 3,
  //     id: 5,
  //     name: 'Cappucinno',
  //     description: 'The best Cappucinno in town.',
  //     cost: 1.50,
  //     size: 'Medium',
  //     image: 'https://media.istockphoto.com/photos/paper-coffee-cup-and-lid-isolated-on-white-picture-id1165889671?s=612x612',
  //   },
  // ],
  menu: [],
  menuItems: [],
  cart: [],
  // ordersList: [
  //   {
  //     id: 3,
  //     total: 9.5,
  //     status: 'pending',
  //     paymentId: 'abcdef',
  //     userId: 2,
  //     Contents: [
  //       { itemId: 1, itemName: 'French Omelette De Fromage', cost: 8.00, quantity: 2 },
  //       { itemId: 5, itemName: 'The best Cappucinno in town.', cost: 1.50, quantity: 1 },
  //     ],
  //     User: {
  //       firstName: 'James',
  //       LastName: 'Harden',
  //       address: 'Kigali',
  //       phoneNumber: '+2507819994180',
  //     },
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: 2,
  //     total: 9.5,
  //     status: 'pending',
  //     paymentId: 'abcdef',
  //     userId: 2,
  //     Contents: [
  //       { itemId: 1, itemName: 'French Omelette De Fromage', cost: 8.00, quantity: 2 },
  //       { itemId: 5, itemName: 'The best Cappucinno in town.', cost: 1.50, quantity: 1 },
  //     ],
  //     User: {
  //       firstName: 'James',
  //       LastName: 'Harden',
  //       address: 'Kigali',
  //       phoneNumber: '+2507819994180',
  //     },
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: 1,
  //     total: 9.5,
  //     status: 'accepted',
  //     paymentId: 'abcdef',
  //     userId: 2,
  //     Contents: [
  //       { itemId: 1, itemName: 'French Omelette De Fromage', cost: 8.00, quantity: 2 },
  //       { itemId: 5, itemName: 'The best Cappucinno in town.', cost: 1.50, quantity: 1 },
  //     ],
  //     User: {
  //       firstName: 'James',
  //       LastName: 'Harden',
  //       address: 'Kigali',
  //       phoneNumber: '+2507819994180',
  //     },
  //     createdAt: new Date(),
  //   },
  // ],
  ordersList: [],
};

export const DataContext = createContext(initialState);

export const DataProvider = ({children}) => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const addMenu = async (data) => {
    dispatch({
      type: 'ADD_MENU',
      payload: data,
    });
  };

  const getMenuItems = async (id) => {
    const category = id === 1 ? 'Breakfast' : id === 2 ? 'Lunch/Dinner' : 'Drinks';
    dispatch({
      type: 'GET_MENU',
      payload: category,
    });
  };

  const addToCart = async (data) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: data,
    });
  };

  const updateCart = async (data) => {
    dispatch({
      type: 'UPDATE_CART',
      payload: data,
    });
  };

  const removeFromCart = async (id) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id,
    });
  };

  const clearCart = async () => {
    dispatch({
      type: 'CLEAR_CART',
    });
  };

  const saveOrders = async (data) => {
    dispatch({
      type: 'ADD_ORDERS',
      payload: data,
    });
  };

  return (
    <DataContext.Provider
      value={{
        menu: state.menu,
        menuItems: state.menuItems,
        cart: state.cart,
        ordersList: state.ordersList,
        addMenu,
        getMenuItems,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        saveOrders,
      }}>
      {children}
    </DataContext.Provider>
  );
};
