import React, { createContext, useReducer } from 'react';
import DataReducer from './reducers/DataReducer';

const initialState = {
  menu: [],
  menuItems: [],
  cart: [],
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
