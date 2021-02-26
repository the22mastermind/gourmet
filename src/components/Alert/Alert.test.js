import React from 'react';
import { render, fireEvent, waitForElementToBeRemoved } from 'test-utils';
import Alert from './Alert';

describe('<Alert /> component', () => {
  it('renders an error alert', () => {
    const screen = render(
      <Alert
        testID="snackbar-alert"
        type="error"
        message="This is an error message"
      />);
  
    expect(screen.getByText('This is an error message')).toBeTruthy();
  });

  it('renders an info alert', () => {
    const screen = render(
      <Alert
        testID="snackbar-alert"
        type="info"
        message="This is an info message"
      />);
  
    expect(screen.getByText('This is an info message')).toBeTruthy();
  });

  it('renders a success alert', () => {
    const screen = render(
      <Alert
        testID="snackbar-alert"
        type="success"
        message="This is a success message"
      />);
  
    expect(screen.getByText('This is a success message')).toBeTruthy();
  });
  
  it('should dismiss the alert correctly', async () => {
    const screen = render(
      <Alert
        testID="snackbar-alert"
        type="success"
        message="This is a success message"
      />);
    
    fireEvent.press(screen.getByRole('button'));
  
    await waitForElementToBeRemoved(() => screen.queryByText('This is a success message'));
  });
  
  it('matches <Alert /> component snapshot', async () => {
    const screen = render(
      <Alert
        testID="snackbar-alert"
        type="error"
        message="This is an error message"
      />);
  
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
