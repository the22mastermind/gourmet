import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { DataProvider } from './context/DataProvider';
import { AuthProvider } from './context/AuthProvider';
import { AlertProvider } from './context/AlertProvider';
import theme from './context/theme';
import Routes from './navigation/Routes';

const App = () => (
  <AuthProvider>
    <DataProvider>
      <AlertProvider>
        <PaperProvider theme={theme}>
          <Routes />
        </PaperProvider>
      </AlertProvider>
    </DataProvider>
  </AuthProvider>
);

export default App;
