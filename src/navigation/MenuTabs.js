import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
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

const MenuTabs = () => {
  const { cart, addToCart, updateCart, menuItems, getMenuItems } = useContext(DataContext);
  const { showAlert } = useContext(AlertContext);

  const handleChange = async (index) => {
    const id = index + 1;
    await getMenuItems(id);
  };

  const handleAddToCart = async (item) => {
    console.log(typeof item, item);
    const itemInCart = cart.find(cartItem => cartItem.id === item.id);
    if (itemInCart) {
      const updatedItem = {
        id: itemInCart.id,
        name: itemInCart.name,
        cost: itemInCart.cost + parseInt(item.cost, 10),
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
        cost: parseInt(item.cost, 10),
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
      onChangeIndex={(newIndex) => handleChange(newIndex)}
    >
      <TabScreen label="Breakfast">
        <View style={styles.tabScreen}>
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
        <View style={styles.tabScreen}>
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
        <View style={styles.tabScreen}>
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

export default MenuTabs;
