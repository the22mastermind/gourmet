import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomTitle from '../../components/CustomTitle/CustomTitle'
import CustomButton from '../../components/CustomButton/CustomButton'
import { AuthContext } from '../../context/AuthProvider';
import { AlertContext } from '../../context/AlertProvider';
import { logoutService } from '../../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});

const HomeScreen = () => {
  const { logout } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => () => setLoading(false), []);

  const handleLogout = async () => {
    setLoading(true);
    const response = await logoutService();
    if (response.status !== 200) {
      await showAlert({
        type: 'error',
        message: response.error,
      });
      setLoading(false);
    } else {
      await showAlert({
        type: 'success',
        message: response.data.message,
      });
      setLoading(false);
      await logout();
    }
  };

  return (
    <View style={styles.container} accessibilityLabel="home-screen">
      <CustomTitle text="Home screen" />
      <CustomButton
        testID="logout-button"
        label="Logout"
        modeValue="contained"
        loading={loading}
        onPress={() => handleLogout()} />
    </View>
  );
};

export default HomeScreen;
