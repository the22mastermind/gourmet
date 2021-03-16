import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../../screens/AccountScreen/AccountScreen';
import customAnimation from '../../utils/customAnimation';

const { Navigator, Screen } = createStackNavigator();

const AccountStack = () => (
  <Navigator
    initialRouteName="Account"
    headerMode="screen"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#a4c49a',
      },
      headerTintColor: '#ffffff',
      ...customAnimation,
    }}>
    <Screen
      name="Account"
      component={AccountScreen}
      options={{ headerTitleAlign: 'center' }}
    />
  </Navigator>
);

export default AccountStack;
