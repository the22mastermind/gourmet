import React from 'react';
import { render, waitFor } from 'test-utils';
import Routes from '../Routes';

describe('<Main navigator />', () => {
  it('renders the login screen when user is not logged in', async () => {
    const screen = render(<Routes />);
    await waitFor(() => expect(screen.queryByText('Login to continue')).toBeDefined());
  });
});
