import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './context/AuthProvider';
import { AlertProvider } from './context/AlertProvider';
import theme from './context/theme';
import Routes from './navigation/Routes';

const App = () => (
  <AuthProvider>
    <AlertProvider>
      <PaperProvider theme={theme}>
        <Routes />
      </PaperProvider>
    </AlertProvider>
  </AuthProvider>
);

export default App;
