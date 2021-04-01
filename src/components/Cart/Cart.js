import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Caption, IconButton, List, useTheme } from 'react-native-paper';
import { DataContext } from '../../context/DataProvider';
import CustomTitle from '../CustomTitle/CustomTitle';
import CustomButton from '../CustomButton/CustomButton';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f7f8f8',
  },
  closeButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemsWrapper: {
    paddingVertical: 6,
  },
  rightWrapper: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  description: {
    marginTop: 6,
  },
  cost: {
    fontSize: 16,
    fontWeight: '700',
    color: '#a4c49a',
  },
  totalWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  total: {
    fontSize: 16,
    fontWeight: '700',
    color: '#777777',
  },
});

const Cart = ({ setVisibleCart }) => {
  const { cart, removeFromCart } = useContext(DataContext);
  const [total, setTotal] = useState(0);
  const theme = useTheme();
  const { navigate } = useNavigation();

  useEffect(() => {
    const cartTotal = cart.reduce((prev, curr) => prev + curr.cost, 0);
    setTotal(cartTotal);
  }, [cart]);

  const handleHideCart = () => setVisibleCart(false);

  const handlePayment = async () => {
    setVisibleCart(false);
    navigate('Payment', { total });
  };

  const handleRemoveFromCart = async (id) => {
    await removeFromCart(id);
  };

  const renderCartItems = (data) => data.map((item) => (
    <List.Item
      key={item.id}
      testID="list-item"
      title={`${item.quantity} x ${item.name}`}
      description={item.description}
      descriptionStyle={styles.description}
      left={props => (
        <Avatar.Image
          {...props}
          source={{
            uri: item.image,
            cache: 'force-cache'
          }}
        />
      )}
      right={props => (
        <View style={styles.rightWrapper}>
          <Caption {...props}>{item.size}</Caption>
          <Text {...props} style={styles.cost}>
            $
            {item.cost}
          </Text>
        </View>
      )}
      onPress={() => handleRemoveFromCart(item.id)}
    />
  ));
  
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        visible
        onRequestClose={handleHideCart}
      >
        <View style={styles.content}>
          <View style={styles.closeButtonWrapper}>
            <CustomTitle text="Your order" />
            <IconButton
              testID="close-bottom-sheet"
              icon="close"
              size={20}
              color={theme.colors.primary}
              onPress={() => handleHideCart()}
            />
          </View>
          <View style={styles.itemsWrapper}>
            {renderCartItems(cart)}
          </View>
          <View style={styles.totalWrapper}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.cost} testID="total-amount">
              $
              {JSON.stringify(total)}
            </Text>
          </View>
          {cart.length !== 0 ? (
            <CustomButton
              testID="checkout-button"
              label={`Pay $${total}`}
              modeValue="contained"
              loading={false}
              onPress={() => handlePayment()}
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

export default Cart;
