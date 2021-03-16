import React, { useContext, useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Caption, IconButton, List, useTheme } from 'react-native-paper';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { DataContext } from '../../context/DataProvider';
import CustomTitle from '../CustomTitle/CustomTitle';
import CustomButton from '../CustomButton/CustomButton';

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: height / 2.5,
    borderColor: '#f7f8f8',
    borderWidth: 1,
    borderRadius: 4,
  },
  content: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
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
  const bottomSheetRef = useRef();
  const theme = useTheme();
  const { navigate } = useNavigation();

  useEffect(() => {
    const cartTotal = cart.reduce((prev, curr) => prev + curr.cost, 0);
    setTotal(cartTotal);
  }, [cart]);

  const handleHideCart = () => setVisibleCart(false);

  const handlePayment = async () => {
    navigate('Payment', { total });
  };

  const handleRemoveFromCart = async (id) => {
    await removeFromCart(id);
  };

  const renderItem = ({ item }) => (
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
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['100%']}
        index={0}
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
          <BottomSheetFlatList
            testID="bottom-sheet-flatlist"
            data={cart}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            style={styles.itemsWrapper}
          />
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
      </BottomSheet>
    </View>
  );
};

export default Cart;
