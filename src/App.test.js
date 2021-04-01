import React from 'react';
import { render, waitFor } from '../test-utils';
import App from './App';

describe('<App />', () => {
  it('mounts the app', async () => {
    const screen = render(<App />);
    await waitFor(() => expect(screen.queryByText('Login to continue')).toBeTruthy());
  });
});
