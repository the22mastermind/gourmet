import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';

const Loader = () => {
  const theme = useTheme();

  return (
    <ActivityIndicator
      animating
      size="large"
      testID="loader"
      theme={theme} />
  );
};

export default Loader;
