import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Caption } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  caption: {
    fontSize: 16,
  },
});

const CustomCaption = ({ text }) => (
  <View style={styles.container}>
    <Caption testID="caption-text" accessibilityLabel="caption-text" style={styles.caption}>
      {text}
    </Caption>
  </View>
);

CustomCaption.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CustomCaption;
