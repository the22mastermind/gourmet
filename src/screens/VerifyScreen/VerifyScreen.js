import React, { useContext, useEffect, useState, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import CodeInput  from 'react-native-confirmation-code-input';
import { AlertContext } from '../../context/AlertProvider';
import CustomTitle from '../../components/CustomTitle/CustomTitle';
import Loader from '../../components/Loader/Loader';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getService, postService } from '../../utils/api';
import storage from '../../utils/storage';

const { width, height } = Dimensions.get('screen');
const { getData } = storage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    padding: 24,
  },
  formWrapper: {
    width: '100%',
    maxHeight: height / 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#a4c49a',
  },
  title: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    color: '#333333',
  },
  resendWrapper: {
    width: '100%',
    marginTop: 6,
  },
});

const VerifyScreen = ({ navigation: { reset } }) => {
  const { showAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const otpInput = useRef();

  useEffect(() => {
    const fetchOTP = async () => {
      const data = await getData('signup');
      const parsedData = JSON.parse(data);
      const { otp } = parsedData;
      setOtpCode(otp);
    };
    fetchOTP();
    return () => {
      setOtpCode('');
      setLoading(false);
    }
  }, []);

  const onSubmit = async (isValid) => {
    setLoading(true);
    if (!isValid) {
      await showAlert({
        type: 'error',
        message: 'Invalid code! Please try again.',
      });
      otpInput.current.clear();
      setLoading(false);
    } else {
      const data = { otp: otpCode };
      const response = await postService('/api/auth/verify', data);
      if (response. status !== 200) {
        await showAlert({
          type: 'error',
          message: response.error,
        });
        setLoading(false);
      } else {
        otpInput.current.clear();
        const { message } = response.data;
        await showAlert({
          type: 'success',
          message,
        });
        setLoading(false);
        reset({
          index: 0,
          routes: [
            { name: 'Login' },
          ],
        });
      }
    }
  };

  const resendCode = async () => {
    setLoading(true);
    const { status, data, error } = await getService('/api/auth/verify/retry');
    if (status !== 200) {
      await showAlert({
        type: 'error',
        message: error,
      });
    } else {
      await showAlert({
        type: 'info',
        message: data.message,
      });
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomTitle text="Verify your account" />
      </View>
      <View style={styles.title}>
        <Text>Enter the 6 digit code sent to your phone number</Text>
      </View>
      <CodeInput
        testID="otp-code-input"
        ref={otpInput}
        keyboardType="numeric"
        className="border-b"
        inputPosition="center"
        codeInputStyle={styles.input}
        containerStyle={styles.formWrapper}
        codeLength={6}
        compareWithCode={otpCode}
        onFulfill={(isValid, code) => onSubmit(isValid, code)}
      />
      <View style={styles.resendWrapper}>
        {loading ? (
          <Loader />
        ) : (
          <CustomButton
            testID="resend-otp-button"
            label="Resend"
            modeValue="text"
            onPress={resendCode}
            loading={loading} />
        )}
      </View>
    </View>
  );
};

export default VerifyScreen;
