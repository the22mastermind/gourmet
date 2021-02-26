import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';
import { AlertContext } from '../../context/AlertProvider';
import CustomTitle from '../../components/CustomTitle/CustomTitle';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import validations from '../../utils/validations';
import { loginService } from '../../utils/api';

const { width } = Dimensions.get('screen');
const { phoneNumber, password } = validations;

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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 24,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#a4c49a',
    marginBottom: 24,
  },
  title: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  formElement: {
    marginBottom: 6,
  },
  signupLink: {
    width: '100%',
    marginTop: 6,
  },
});

const LoginScreen = ({ navigation: { navigate } }) => {
  const { login } = useContext(AuthContext);
  const { showAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const { control, errors, handleSubmit } = useForm();

  useEffect(() => () => setLoading(false), []);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await loginService(data);
    if (response. status !== 200) {
      await showAlert({
        type: 'error',
        message: response.error,
      });
      setLoading(false);
    } else {
      const { token } = response.data;
      const payload = { ...response.data.data };
      await login(token, payload);
    }
  };

  return (
    <View style={styles.container} accessibilityLabel="login-screen">
      <View style={styles.title}>
        <CustomTitle text="Login to continue" />
      </View>
      <View style={styles.formWrapper}>
        <View style={styles.formElement} accessibilityLabel="phone-input-wrapper">
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                testID="phone-number-input"
                label="Phone number"
                mode="outlined"
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={value}
                onChangeText={val => onChange(val)}
                onBlur={onBlur}
                error={!!errors?.phoneNumber}
                errorMessage={errors?.phoneNumber?.message}
              />
            )}
            name="phoneNumber"
            rules={phoneNumber}
            defaultValue=""
          />
        </View>
        <View style={styles.formElement} accessibilityLabel="password-input-wrapper">
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                testID="password-input"
                label="Password"
                mode="outlined"
                placeholder="Password"
                secureTextEntry
                value={value}
                onChangeText={val => onChange(val)}
                onBlur={onBlur}
                error={!!errors?.password}
                errorMessage={errors?.password?.message}
              />
            )}
            name="password"
            rules={password}
            defaultValue=""
          />
        </View>
        <View style={styles.formElement}>
          <CustomButton
            testID="login-button"
            label="Login"
            modeValue="contained"
            onPress={handleSubmit(onSubmit)}
            loading={loading} />
        </View>
      </View>
      <Text>or</Text>
      <View style={styles.signupLink}>
        <CustomButton
          testID="go-to-signup-button"
          label="Create an account"
          modeValue="text"
          onPress={() => navigate('Signup')} />
      </View>
    </View>
  );
};

export default LoginScreen;
