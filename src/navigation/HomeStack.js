import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import customAnimation from '../utils/customAnimation';

const { Navigator, Screen } = createStackNavigator();

const HomeStack = () => (
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
    <Screen name="Home" component={HomeScreen} />
  </Navigator>
);

export default HomeStack;
