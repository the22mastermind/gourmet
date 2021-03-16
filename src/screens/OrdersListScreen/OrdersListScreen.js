/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import ListItems from '../../components/ListItems/ListItems';
import Loader from '../../components/Loader/Loader';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { DataContext } from '../../context/DataProvider';
import { getService } from '../../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  noData: {
    textAlign: 'center',
  },
});

const OrdersListScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { ordersList, saveOrders } = useContext(DataContext);

  useEffect(() => {
    const isFocused = navigation.addListener('focus', async () => {
      setLoading(true);
      const { status, data } = await getService('/api/orders', 'GET');
      if (status === 200) {
        await saveOrders(data.data);
      }
      // else {
      //   await saveOrders([]);
      // }
      setOrderId(null);
      setShowDetails(false);
      setLoading(false);
    });

    return () => {
      isFocused();
      setLoading(false);
    }
  }, [navigation]);

  const handleOrder = async ({ id }) => {
    setOrderId(id);
    setShowDetails(true);
  };

  const noDataFound = () => <Paragraph style={styles.noData}>No orders found</Paragraph>

  return (
    <View style={styles.container}>
      {loading ? 
        <Loader />
        : ordersList.length > 0 ? (
          <>
            <ListItems items={ordersList} handleItem={handleOrder} />
            {showDetails ? <OrderDetails orderId={orderId} setShowDetails={setShowDetails} /> : null}
          </>
          )
          : noDataFound()}
    </View>
  );
};

export default OrdersListScreen;
