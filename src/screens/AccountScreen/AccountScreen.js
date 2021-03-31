import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';
import CustomButton from '../../components/CustomButton/CustomButton';
import { AuthContext } from '../../context/AuthProvider';
import { AlertContext } from '../../context/AlertProvider';
import { getService } from '../../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  innerContainer: {
    flex: 1,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  text: {
    fontSize: 14,
  },
});

const AccountScreen = () => {
  const { auth, logout } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => () => setLoading(false), []);

  const handleLogout = async () => {
    setLoading(true);
    const { status, data, error } = await getService('/api/auth/logout');
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
      <View style={styles.innerContainer}>
        <View style={styles.item}>
          <Caption style={styles.label}>Name</Caption>
          <Caption style={styles.text}>
            {auth?.firstName}
            {' '}
            {auth?.lastName}
          </Caption>
        </View>
        <View style={styles.item}>
          <Caption style={styles.label}>Phone</Caption>
          <Caption style={styles.text}>{auth?.phoneNumber}</Caption>
        </View>
        <View style={styles.item}>
          <Caption style={styles.label}>Address</Caption>
          <Caption style={styles.text}>{auth?.address}</Caption>
        </View>
        <View style={styles.item}>
          <Caption style={styles.label}>Number of orders</Caption>
          <Caption style={styles.text}>{auth?.Orders.length}</Caption>
        </View>
        <View style={styles.item}>
          <Caption style={styles.label}>Account created on</Caption>
          <Caption style={styles.text}>{new Date(auth?.createdAt).toDateString()}</Caption>
        </View>
      </View>
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
