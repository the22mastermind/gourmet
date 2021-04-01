import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import customAnimation from '../../utils/customAnimation';
import MainStack from './MainStack';
import OrdersStack from './OrdersStack';
import AccountStack from './AccountStack';
import Loader from '../../components/Loader/Loader';
import { AuthContext } from '../../context/AuthProvider';
import { DataContext } from '../../context/DataProvider';
import { AlertContext } from '../../context/AlertProvider';
import { getService } from '../../utils/api';

const { Navigator, Screen } = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  bar: {
    backgroundColor: '#f7f8f8',
  },
});

const HomeStack = () => {
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const { addMenu } = useContext(DataContext);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    const fetchMenu = async () => {
      const { status, data, error } = await getService('/api/menu');
      if (status === 200) {
        await addMenu(data.data);
        setLoading(false);
      } else if (status === 404) {
        await addMenu([]);
        setLoading(false);
      } else if (status === 401) {
        await showAlert({
          type: 'error',
          message: error,
        });
        await logout();
      }
    };
    fetchMenu();
  }, []);

  return loading ? (
    <View style={styles.container}>
      <Loader />
    </View>
  ) : (
    <Navigator
      initialRouteName="Main"
      activeColor="#a4c49a"
      inactiveColor="#777777"
      shifting
      labeled={false}
      barStyle={styles.bar}
      screenOptions={{
        tabBarTestID: 'bottom-tab-bar',
        tabBarAccessibilityLabel: 'bottom-tab-bar',
        ...customAnimation,
      }}
    >
      <Screen
        name="Main"
        component={MainStack}
        options={{
          tabBarLabel: 'Main',
          tabBarIcon: ({ color }) => (
            <Icon name='home-outline' color={color} size={26} />
          )
        }} />
      <Screen
        name="Orders"
        component={OrdersStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='shopping-outline' color={color} size={26} />
          )
        }} />
      <Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarTestID: 'tab-bar-account-icon',
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <Icon name='account-outline' color={color} size={26} />
          )
        }} />
    </Navigator>
  );
};

export default HomeStack;
