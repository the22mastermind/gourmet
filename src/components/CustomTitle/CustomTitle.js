import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
});

const CustomTitle = ({ text }) => (
  <Title testID="title" accessibilityLabel="title" style={styles.title}>
    {text}
  </Title>
);

CustomTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CustomTitle;
