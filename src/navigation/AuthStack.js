import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import VerifyScreen from '../screens/VerifyScreen/VerifyScreen';
import customAnimation from '../utils/customAnimation';

const { Navigator, Screen } = createStackNavigator();

const AuthStack = () => (
  <Navigator
    initialRouteName="Login"
    screenOptions={customAnimation}
    headerMode="none">
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Signup" component={SignupScreen} />
    <Screen name="Verify" component={VerifyScreen} />
  </Navigator>
);

export default AuthStack;
