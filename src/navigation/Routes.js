import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/AuthProvider';
import { AlertContext } from '../context/AlertProvider';
import AuthStack from './stacks/AuthStack';
import HomeStack from './stacks/HomeStack';
import Loader from '../components/Loader/Loader';
import Alert from '../components/Alert/Alert';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

const Routes = () => {
  const { auth, getAuthState } = useContext(AuthContext);
  const { alert } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthState = async () => {
      await getAuthState();
      setLoading(false);
    };
    fetchAuthState();
    // return () => setLoading(false);
  }, []);

  return loading ? (
    <View style={styles.container}>
      <Loader />
    </View>
  ) : (
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
