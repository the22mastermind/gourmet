import 'react-native';
import React from 'react';
import { render } from 'test-utils';
import App from './App';

it('renders <App /> correctly', () => {
  const screen = render(<App />);

  expect(screen.getByText('Welcome')).toBeTruthy();
});
