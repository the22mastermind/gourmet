import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import ListItems from '../../components/ListItems/ListItems';
import Loader from '../../components/Loader/Loader';
import { DataContext } from '../../context/DataProvider';
import { getService } from '../../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noData: {
    textAlign: 'center',
  },
});

const OrdersListScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const { ordersList, saveOrders } = useContext(DataContext);

  useEffect(() => {
    const isFocused = navigation.addListener('focus', async () => {
      const { status, data } = await getService('/api/orders');
      if (status === 200) {
        await saveOrders(data.data);
      } else {
        await saveOrders([]);
      }
      setLoading(false);
    });

    return () => {
      isFocused();
    }
  }, [navigation]);

  const handleOrder = async ({ id }) => {
    navigation.navigate('Order Details', { orderId: id });
  };

  return loading ? (
    <View style={styles.loaderWrapper}>
      <Loader />
    </View>
  ) : ordersList.length > 0 ? (
    <View style={styles.container}>
      <ListItems items={ordersList} handleItem={handleOrder} />
    </View>
  ) : (
    <>
      <Paragraph testID="no-data-found" style={styles.noData}>
        No orders found at the moment.
      </Paragraph>
    </>
  );
};

export default OrdersListScreen;
