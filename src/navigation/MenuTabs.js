import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Tabs, TabScreen } from 'react-native-paper-tabs';
import ListItems from '../components/ListItems/ListItems';
import CustomCaption from '../components/CustomCaption/CustomCaption';
import { DataContext } from '../context/DataProvider';
import { AlertContext } from '../context/AlertProvider';

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#ffffff',
    elevation: 0,
  },
  tabScreen: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
});

const MenuTabs = ({ menuItems, handleChangeIndex }) => {
  const { cart, addToCart, updateCart } = useContext(DataContext);
  const { showAlert } = useContext(AlertContext);

  const handleAddToCart = async (item) => {
    const itemInCart = cart.find(cartItem => cartItem.id === item.id);
    if (itemInCart) {
      const updatedItem = {
        id: itemInCart.id,
        name: itemInCart.name,
        cost: itemInCart.cost + Number(item.cost),
        quantity: itemInCart.quantity + 1,
        image: itemInCart.image,
        size: itemInCart.size,
      };
      await updateCart(updatedItem);
      await showAlert({
        type: 'info',
        message: 'Cart updated successfully',
      });
    } else {
      const newItem = {
        id: item.id,
        name: item.name,
        cost: Number(item.cost),
        quantity: 1,
        image: item.image,
        size: item.size,
      };
      await addToCart(newItem);
      await showAlert({
        type: 'info',
        message: `${item.name} added to cart successfully`,
      });
    }
  };

  return (
    <Tabs
      style={styles.tab}
      defaultIndex={0}
      onChangeIndex={(newIndex) => handleChangeIndex(newIndex)}
    >
      <TabScreen label="Breakfast">
        <View style={styles.tabScreen} testID="breakfast-tab">
          {menuItems.length > 0 ? (
            <ListItems
              items={menuItems}
              handleItem={handleAddToCart}
            />
            ) : (
              <CustomCaption text="Items not found" />
          )}
        </View>
      </TabScreen>
      <TabScreen label="Lunch/Dinner">
        <View style={styles.tabScreen} testID="lunch-dinner-tab">
          {menuItems.length > 0 ? (
            <ListItems
              items={menuItems}
              handleItem={handleAddToCart}
            />
            ) : (
              <CustomCaption text="Items not found" />
          )}
        </View>
      </TabScreen>
      <TabScreen label="Drinks">
        <View style={styles.tabScreen} testID="drinks-tab">
          {menuItems.length > 0 ? (
            <ListItems
              items={menuItems}
              handleItem={handleAddToCart}
            />
            ) : (
              <CustomCaption text="Items not found" />
          )}
        </View>
      </TabScreen>
    </Tabs>
  );
};

MenuTabs.propTypes = {
  menuItems: PropTypes.arrayOf(Object).isRequired,
  handleChangeIndex: PropTypes.func.isRequired,
};

export default MenuTabs;
