import React, { useContext, useEffect } from 'react';
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
  const { cart, menuItems, getMenuItems } = useContext(DataContext);

  const handleChangeIndex = async (index) => {
    const id = index + 1;
    await getMenuItems(id);
  };

  useEffect(() => {
    const initializeTabs = async () => {
      await handleChangeIndex(0);
    };
    initializeTabs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CustomTitle text={`Welcome, ${auth.firstName}`} />
        <Caption>{auth?.address}</Caption>
      </View>
      <MenuTabs menuItems={menuItems} handleChangeIndex={handleChangeIndex} />
      {cart.length > 0 ? <CartButton items={cart.length} /> : null}
    </View>
  );
};

export default MainScreen;
