import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import PropTypes from 'prop-types';
import ListItemsRight from './ListItemsRight';

const styles = StyleSheet.create({
  description: {
    marginTop: 6,
  },
});

const ListItems = ({ items, handleItem }) => (
  items.map(item => (
    <List.Item
      key={item.id}
      testID={item?.id.toString()}
      title={item?.name ? item?.name : `Order #${item?.id}`}
      description={item?.description ? item?.description : `${item?.Contents?.length} items`}
      descriptionStyle={styles.description}
      left={props => item?.image ? (
        <Avatar.Image
          {...props}
          testID="item-image"
          source={{
            uri: item?.image,
            cache: 'force-cache'
          }}
        />
      ) : null}
      right={props => (
        <ListItemsRight
          top={item?.description ? item?.size : new Date(item?.createdAt).toDateString()}
          bottom={item?.cost ? `$${item.cost}` : item?.status}
          {...props}
        />
      )}
      onPress={() => handleItem(item)}
  />
  ))
);

ListItems.propTypes = {
  items: PropTypes.arrayOf(Object).isRequired,
  handleItem: PropTypes.func.isRequired,
};

export default ListItems;
