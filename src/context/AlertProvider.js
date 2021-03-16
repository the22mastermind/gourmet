import React, { createContext, useReducer } from 'react';
import AlertReducer from './reducers/AlertReducer';

const initialState = {
  alert: null,
};

export const AlertContext = createContext(initialState);

export const AlertProvider = ({children}) => {
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const showAlert = (data) => {
    dispatch({
      type: 'SHOW_ALERT',
      payload: data,
    });
  };

  const clearAlert = async () => {
    dispatch({
      type: 'CLEAR_ALERT',
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
        clearAlert,
      }}>
      {children}
    </AlertContext.Provider>
  );
};
