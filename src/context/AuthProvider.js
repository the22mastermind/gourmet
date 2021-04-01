import React, { createContext, useReducer } from 'react';
import AuthReducer from './reducers/AuthReducer';
import storage from '../utils/storage';

const { getData, storeData, clearAllData } = storage;

const initialState = {
  auth: null,
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const getAuthState = async () => {
    const auth = await getData('auth');
    dispatch({
      type: 'AUTH_GET_STATE',
      payload: JSON.parse(auth),
    });
  };

  const login = async (token, data) => {
    await storeData('token', token);
    await storeData('auth', data);
    dispatch({
      type: 'AUTH_LOGIN',
      payload: data,
    });
  };

  const logout = async () => {
    dispatch({
      type: 'AUTH_LOGOUT',
    });
    await clearAllData();
  };

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
        getAuthState,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
