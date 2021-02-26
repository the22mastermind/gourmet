import React from 'react';
import PropTypes from 'prop-types';
import { HelperText, TextInput } from 'react-native-paper';

const CustomInput = ({
  testID,
  label,
  mode,
  secureTextEntry,
  placeholder,
  keyboardType,
  value,
  onChangeText,
  error,
  errorMessage,
}) => (
  <>
    <TextInput
      testID={testID}
      accessibilityLabel={testID}
      label={label}
      mode={mode}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
      error={error} />
    <HelperText
      testID="helper-text-error"
      accessibilityLabel="helper-text-error"
      type="error"
      visible={error}>
      {errorMessage}
    </HelperText>
  </>
);

CustomInput.defaultProps = {
  secureTextEntry: false,
  keyboardType: 'default',
  error: false,
  errorMessage: '',
};

CustomInput.propTypes = {
  testID: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
};

export default CustomInput;
