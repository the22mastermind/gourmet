import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AlertContext } from '../../context/AlertProvider';
import CustomTitle from '../../components/CustomTitle/CustomTitle';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import validations from '../../utils/validations';
import { signupService } from '../../utils/api';
import storage from '../../utils/storage';

const { width } = Dimensions.get('screen');
const {
  firstName,
  lastName,
  phoneNumber,
  address,
  password,
} = validations;
const { storeData } = storage;

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
  },
  title: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  formElement: {
    marginBottom: 6,
  },
});

const SignupScreen = ({ navigation: { reset } }) => {
  const { showAlert } = useContext(AlertContext);
  const [loading, setLoading] = useState(false);
  const { control, errors, handleSubmit } = useForm();

  useEffect(() => () => setLoading(false), []);

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await signupService(data);
    if (response. status !== 201) {
      await showAlert({
        type: 'error',
        message: response.error,
      });
      setLoading(false);
    } else {
      const { token } = response.data;
      const signup = { ...response.data.data };
      await storeData('token', token);
      await storeData('signup', signup);
      reset({
        index: 0,
        routes: [
          { name: 'Verify' },
        ],
      });
    }
  };

  return (
    <View style={styles.container} accessibilityLabel="signup-screen">
      <View style={styles.title}>
        <CustomTitle text="Create an account" />
      </View>
      <View style={styles.formWrapper}>
        <View style={styles.formElement}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                testID="firstname-input"
                label="First name"
                mode="outlined"
                placeholder="First name"
                keyboardType="default"
                value={value}
                onChangeText={val => onChange(val)}
                onBlur={onBlur}
                error={!!errors?.firstName}
                errorMessage={errors?.firstName?.message}
              />
            )}
            name="firstName"
            rules={firstName}
            defaultValue=""
          />
        </View>
        <View style={styles.formElement}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                testID="lastname-input"
                label="Last name"
                mode="outlined"
                placeholder="Last name"
                keyboardType="default"
                value={value}
                onChangeText={val => onChange(val)}
                onBlur={onBlur}
                error={!!errors?.lastName}
                errorMessage={errors?.lastName?.message}
              />
            )}
            name="lastName"
            rules={lastName}
            defaultValue=""
          />
        </View>
        <View style={styles.formElement}>
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
        <View style={styles.formElement}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <CustomInput
                testID="address-input"
                label="Address"
                mode="outlined"
                placeholder="Address"
                keyboardType="default"
                value={value}
                onChangeText={val => onChange(val)}
                onBlur={onBlur}
                error={!!errors?.address}
                errorMessage={errors?.address?.message}
              />
            )}
            name="address"
            rules={address}
            defaultValue=""
          />
        </View>
        <View style={styles.formElement}>
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
            testID="signup-button"
            label="Sign Up"
            modeValue="contained"
            onPress={handleSubmit(onSubmit)}
            loading={loading} />
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;
