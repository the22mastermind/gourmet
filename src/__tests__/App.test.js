import React from 'react';
import { render, waitFor } from 'test-utils';
import App from '../App';

describe('<App />', () => {
  it('<App /> providers matches the snapshot', async () => {
    const screen = render(<App />);
    await waitFor(() => expect(screen.toJSON()).toMatchSnapshot());
  });
});
