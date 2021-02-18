import React from 'react';
import { render } from '@testing-library/react-native';
import PaperProvider from 'react-native-paper/lib/commonjs/core/Provider';

const AllTheProviders = ({ children }) => (
  <PaperProvider>{children}</PaperProvider>
);

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';

export { customRender as render };
