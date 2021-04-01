import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import PropTypes from 'prop-types';
import Cart from '../Cart/Cart';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#a4c49a',
  },
});

const CartButton = ({ items }) => {
  const [visibleCart, setVisibleCart] = useState(false);
  
  return (
    visibleCart ? (
      <Cart setVisibleCart={setVisibleCart} />
    ) : (
      <FAB
        testID="cart-button"
        style={styles.fab}
        label={items ? JSON.stringify(items) : null}
        icon="shopping-outline"
        color="#f7f8f8"
        onPress={() => setVisibleCart(!visibleCart)}
      />
    )
  );
};

CartButton.propTypes = {
  items: PropTypes.number.isRequired,
};

export default CartButton;
