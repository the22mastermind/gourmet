import React from 'react';
import { StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

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
    additionalInputsProps={{
      number: {
        testID: 'number-card-input',
      },
      expiry: {
        testID: 'expiry-card-input',
      },
      cvc: {
        testID: 'cvc-card-input',
      },
    }}
  />
);

export default CreditCardForm;
