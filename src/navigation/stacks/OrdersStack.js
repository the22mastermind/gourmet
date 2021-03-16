import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OrdersListScreen from '../../screens/OrdersListScreen/OrdersListScreen';
import customAnimation from '../../utils/customAnimation';

const { Navigator, Screen } = createStackNavigator();

const OrdersStack = () => (
  <Navigator
    initialRouteName="Orders List"
    headerMode="screen"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#a4c49a',
      },
      headerTintColor: '#ffffff',
      ...customAnimation,
    }}>
    <Screen
      name="Orders List"
      component={OrdersListScreen}
      options={{ headerTitleAlign: 'center' }}
    />
  </Navigator>
);

export default OrdersStack;
