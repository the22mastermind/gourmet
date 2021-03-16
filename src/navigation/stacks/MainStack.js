import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../../screens/MainScreen/MainScreen';
import PaymentScreen from '../../screens/PaymentScreen/PaymentScreen';
import customAnimation from '../../utils/customAnimation';

const { Navigator, Screen } = createStackNavigator();

const MainStack = () => (
  <Navigator
    initialRouteName="Home"
    headerMode="screen"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#a4c49a',
      },
      headerTintColor: '#ffffff',
      ...customAnimation,
    }}>
    <Screen
      name="Home"
      component={MainScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name="Payment"
      component={PaymentScreen}
      options={{ headerTitleAlign: 'center' }}
    />
  </Navigator>
);

export default MainStack;
