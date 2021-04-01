import React, { useContext, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import stripe from '../../utils/stripeInit';
import { AlertContext } from '../../context/AlertProvider';
import { DataContext } from '../../context/DataProvider';
import CustomTitle from '../../components/CustomTitle/CustomTitle';
import CustomButton from '../../components/CustomButton/CustomButton';
import Loader from '../../components/Loader/Loader';
import CreditCardForm from '../../components/CreditCardForm/CreditCardForm';
import PaymentCards from '../../assets/payment-cards.png';
import { postService } from '../../utils/api';
import cartParser from '../../utils/cart';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  cardsWrapper: {
    marginVertical: 12,
    width: '100%',
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cards: {
    width:'100%',
    height: 100,
  },
});

const PaymentScreen = ({ navigation: { navigate, reset }, route: { params } }) => {
  const [loading, setLoading] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const { showAlert } = useContext(AlertContext);
  const { cart, clearCart } = useContext(DataContext);

  const handlePaymentInit = () => setShowCardForm(true);

  const handleCreditCardForm = async (formData) => {
    if (formData?.valid) {
      const { values } = formData;
      const expMonth = parseInt(values.expiry.split('/').shift(), 10);
      const expYear = parseInt(values.expiry.split('/').pop(), 10);
      const cardDetails = {
        number: values.number,
        expMonth,
        expYear ,
        cvc: values.cvc,
      };
      const valid = await stripe.isCardValid(cardDetails);
      if (valid) {
        setLoading(true);
        setShowCardForm(false);
        try {
          const { status, data, error } = await postService('/api/payments', { amount: params.total * 100 });
          if (status !== 200) {
            setLoading(false);
            await showAlert({
              type: 'error',
              message: error,
            });
          } else {
            const { clientSecret } = data.data;
            const res = await stripe.confirmPayment(clientSecret, cardDetails);
            if (res.id) {
              const parsedCart = await cartParser(cart);
              const payload = {
                total: params.total,
                contents: parsedCart,
                paymentId: res.id,
              };
              const response = await postService('/api/orders', payload);
              if (response.status !== 201) {
                await showAlert({
                  type: 'error',
                  message: response.error,
                });
                setLoading(false);
              } else {
                const { message } = response.data;
                await showAlert({
                  type: 'success',
                  message,
                });
                await clearCart();
                setLoading(false);
                reset({
                  index: 0,
                  routes: [
                    { name: 'Home' },
                  ],
                });
                navigate('Orders');
              }
            } else {
              setLoading(false);
            }
          }
        } catch (error) {
          setLoading(false);
          await showAlert({
            type: 'error',
            message: error.message,
          });
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <CustomTitle text="Confirm your order" />
      <View style={styles.cardsWrapper}>
        <Image
          testID="payment-cards"
          source={PaymentCards}
          style={styles.cards}
          resizeMode="center"
          resizeMethod="scale"
        />
      </View>
      {loading ? (
        <Loader />
      ) : showCardForm ? <CreditCardForm onChange={handleCreditCardForm} /> : (
        <CustomButton
          testID="pay-button"
          label={`Pay $${params?.total}`}
          modeValue="contained"
          onPress={() => handlePaymentInit()}
        />
      )}
    </View>
  );
};

export default PaymentScreen;
