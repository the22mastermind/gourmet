import React from 'react';
import { Caption } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    marginLeft: 12,
  },
  bottom: {
    fontSize: 14,
    fontWeight: '700',
    color: '#a4c49a',
    textTransform: 'capitalize',
  },
});

const ListItemsRight = ({ top, bottom, ...rest }) => (
  <View style={styles.container} testID="list-item-right-wrapper">
    <Caption testID="list-item-right-top" {...rest}>{top}</Caption>
    <Text testID="list-item-right-bottom" {...rest} style={styles.bottom}>
      {bottom}
    </Text>
  </View>
);

export default ListItemsRight;
