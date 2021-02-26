import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { AlertContext } from '../../context/AlertProvider';

const styles = StyleSheet.create({
  error: {
    backgroundColor: '#f44336',
  },
  info: {
    backgroundColor: '#2196f3',
  },
  success: {
    backgroundColor: '#4caf50',
  },
});

const Alert = ({ testID, type, message }) => {
  const [visible, setVisible] = React.useState(true);
  const { clearAlert } = useContext(AlertContext);

  const onDismissSnackBar = async () => {
    setVisible(false);
    await clearAlert();
  };

  return (
    <>
      <Snackbar
        testID={testID}
        accessibilityLabel={testID}
        visible={visible}
        duration={5000}
        onDismiss={onDismissSnackBar}
        style={type === 'error' ? styles.error : type === 'info' ? styles.info : styles.success}
        action={{
          label: 'Dismiss',
          onPress: () => onDismissSnackBar(),
        }}>
        {message}
      </Snackbar>
    </>
  );
};

Alert.propTypes = {
  testID: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;
