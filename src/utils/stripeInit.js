import stripe from 'react-native-stripe-payments';
import { STRIPE_PUBLISHABLE_KEY } from '@env';

stripe.setOptions({
  publishingKey: STRIPE_PUBLISHABLE_KEY,
});

export default stripe;
