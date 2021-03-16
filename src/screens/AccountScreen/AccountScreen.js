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

const AccountScreen = () => {
  const { logout } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => () => setLoading(false), []);

  const handleLogout = async () => {
    setLoading(true);
    const { status, data, error } = await logoutService();
    if (status !== 200) {
      await showAlert({
        type: 'error',
        message: error,
      });
      setLoading(false);
    } else {
      await showAlert({
        type: 'success',
        message: data.message,
      });
      setLoading(false);
      await logout();
    }
  };

  return (
    <View style={styles.container} accessibilityLabel="account-screen">
      <CustomTitle text="Account screen" />
      <CustomButton
        testID="logout-button"
        label="Logout"
        modeValue="contained"
        loading={loading}
        onPress={() => handleLogout()} />
    </View>
  );
};

export default AccountScreen;
