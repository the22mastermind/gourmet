import React from 'react';
import PropTypes from 'prop-types';
import { LogBox, StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

LogBox.ignoreLogs(['Warning: componentWillReceiveProps']);

const styles = StyleSheet.create({
  label: {
    color: '#333333',
    fontSize: 18,
  },
  input: {
    fontSize: 16,
  },
});

const CreditCardForm = ({ onChange }) => (
  <CreditCardInput
    onChange={onChange}
    labelStyle={styles.label}
    inputStyle={styles.input}
  />
);

CreditCardForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CreditCardForm;
