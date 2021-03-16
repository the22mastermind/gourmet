import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';
import { AuthContext } from '../../context/AuthProvider';
import { DataContext } from '../../context/DataProvider';
import MenuTabs from '../../navigation/MenuTabs';
import CustomTitle from '../../components/CustomTitle/CustomTitle';
import CartButton from '../../components/CartButton/CartButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
  },
});

const MainScreen = () => {
  const { auth } = useContext(AuthContext);
  const { cart } = useContext(DataContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomTitle text={`Welcome, ${auth.firstName}`} />
        <Caption>{auth?.address}</Caption>
      </View>
      <MenuTabs />
      {cart.length > 0 ? <CartButton items={cart.length} /> : null}
    </View>
  );
};

export default MainScreen;
