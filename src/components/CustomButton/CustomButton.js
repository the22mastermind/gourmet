import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  buttonContent: {
    height: height / 15,
  },
});

const CustomButton = ({testID, label, modeValue, onPress, loading}) => {
  const { colors } = useTheme();

  return (
    <Button
      testID={testID}
      accessibilityLabel={testID}
      mode={modeValue}
      onPress={onPress}
      loading={loading}
      contentStyle={styles.buttonContent}
      labelStyle={modeValue === 'text' ? { color: colors.link } : { color: colors.buttonText }}>
      {label}
    </Button>
  );
};

CustomButton.defaultProps = {
  loading: false,
};

CustomButton.propTypes = {
  testID: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  modeValue: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default CustomButton;
