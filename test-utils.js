import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthProvider';
import { DataProvider } from './src/context/DataProvider';
import { AlertProvider } from './src/context/AlertProvider';
import theme from './src/context/theme';

const AllTheProviders = ({ children }) => (
  <AuthProvider>
    <DataProvider>
      <AlertProvider>
        <PaperProvider theme={theme}>
          {children}
        </PaperProvider>
      </AlertProvider>
    </DataProvider>
  </AuthProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
