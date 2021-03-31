import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';
import Loader from '../../components/Loader/Loader';
import { AlertContext } from '../../context/AlertProvider';
import { getService } from '../../utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  status: {
    fontWeight: '700',
    color: '#a4c49a',
    textTransform: 'capitalize',
  },
  content: {
    margin: 12,
  },
});

const OrderDetailsScreen = ({ route: { params } }) => {
  const { showAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { status, data, error } = await getService(`/api/orders/${params.orderId}`);
      if (status === 200) {
        setOrderDetails(data.data);
      } else {
        setOrderDetails({});
        await showAlert({
          type: 'error',
          message: error,
        });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const renderOrderItems = (contents) => contents.map((item) => (
    <View style={styles.item} key={item.itemId}>
      <Caption style={styles.text}>
        {`${item.quantity} x ${item.itemName}`}
      </Caption>
      <Caption style={styles.text}>
        {`$${item.cost}`}
      </Caption>
    </View>
  ));

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderWrapper}>
          <Loader />
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <View style={styles.item}>
            <Caption style={styles.label}>Order ID</Caption>
            <Caption style={styles.text}>
              #
              {orderDetails?.id}
            </Caption>
          </View>
          <View style={styles.item}>
            <Caption style={styles.label}>Status</Caption>
            <Caption style={[styles.text, styles.status]}>{orderDetails?.status}</Caption>
          </View>
          <View style={styles.item}>
            <Caption style={styles.label}>Placed on</Caption>
            <Caption style={styles.text}>{new Date(orderDetails?.createdAt).toDateString()}</Caption>
          </View>
          <Caption style={styles.label}>Items</Caption>
          <View style={styles.content}>
            {renderOrderItems(orderDetails.Contents)}
          </View>
          <View style={styles.item}>
            <Caption style={styles.label}>Total</Caption>
            <Caption style={styles.text}>
              $
              {orderDetails?.total}
            </Caption>
          </View>
        </View>
      )}
    </View>
  );
};

export default OrderDetailsScreen;
