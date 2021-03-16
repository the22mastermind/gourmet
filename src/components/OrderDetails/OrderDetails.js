import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { IconButton, List, useTheme } from 'react-native-paper';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import CustomTitle from '../CustomTitle/CustomTitle';
import Loader from '../Loader/Loader';
import { getService } from '../../utils/api';

const { height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: height / 2.5,
    borderColor: '#f7f8f8',
    borderWidth: 1,
    borderRadius: 4,
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  status: {
    textTransform: 'capitalize',
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

const OrderDetails = ({ orderId, setShowDetails }) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const bottomSheetRef = useRef();
  const theme = useTheme();

  useEffect(() => {
    const fetchDetails = async () => {
      const { status, data } = await getService(`/api/orders/${orderId}`, 'GET');
      if (status !== 200) {
        setOrder({});
      } else {
        setOrder(data.data);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [orderId]);

  const handleClose = () => setShowDetails(false);

  const renderItem = ({ item }) => (
    <List.Item
      key={item.itemId}
      testID="list-item"
      title={`${item.quantity} x ${item.itemName}`}
      // description={item.description}
      // descriptionStyle={styles.description}
      // left={props => (
      //   <Avatar.Image
      //     {...props}
      //     source={{
      //       uri: item.image,
      //       cache: 'force-cache'
      //     }}
      //   />
      // )}
      right={props => (
        <View style={styles.rightWrapper}>
          {/* <Caption {...props}>{item.size}</Caption> */}
          <Text {...props} style={styles.cost}>
            $
            {item.cost}
          </Text>
        </View>
      )}
    />
  );

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['100%']}
        index={0}
      >
        {loading ? (
          <View style={styles.loaderWrapper}>
            <Loader />
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.closeButtonWrapper}>
              <CustomTitle text={`Order ${orderId} details`} />
              <IconButton
                testID="close-bottom-sheet"
                icon="close"
                size={20}
                color={theme.colors.primary}
                onPress={() => handleClose()}
              />
            </View>
            <View style={styles.totalWrapper}>
              <Text style={styles.total}>Status</Text>
              <Text style={[styles.cost, styles.status]} testID="order-status">{order.status}</Text>
            </View>
            <BottomSheetFlatList
              testID="bottom-sheet-flatlist"
              data={order.Contents}
              keyExtractor={item => item.itemId.toString()}
              renderItem={renderItem}
              style={styles.itemsWrapper}
            />
            <View style={styles.totalWrapper}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.cost} testID="total-amount">
                $
                {order.total}
              </Text>
            </View>
          </View>
          )}
      </BottomSheet>
    </View>
  );
};

export default OrderDetails;
