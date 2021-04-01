import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { AuthContext } from '../context/AuthProvider';
import { AlertContext } from '../context/AlertProvider';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';
import Alert from '../components/Alert/Alert';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

const Routes = () => {
  const { auth, getAuthState } = useContext(AuthContext);
  const { alert } = useContext(AlertContext);

  useEffect(() => {
    const fetchAuthState = async () => {
      await getAuthState();
      SplashScreen.hide();
    };
    fetchAuthState();
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.wrapper}>
        {auth ? <HomeStack /> : <AuthStack />}
        {alert ? (
          <Alert
            testID="snackbar"
            type={alert.type}
            message={alert.message}
          />
          ) : null}
      </View>
    </NavigationContainer>
  );
};

export default Routes;
