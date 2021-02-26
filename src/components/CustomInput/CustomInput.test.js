import React from 'react';
import { fireEvent, render } from 'test-utils';
import CustomInput from './CustomInput';

const props = {
  testID: 'text-input',
  label: 'Text',
  mode: 'outlined',
  placeholder: 'Text',
  value: '',
  onChangeText: jest.fn(),

};

describe('<CustomInput />', () => {
  it('renders <CustomInput /> correctly', async () => {
    const screen = render(<CustomInput {...props} />);
  
    expect(screen.getByTestId('text-input')).toBeTruthy();
  });

  it('should trigger is required validation error', async () => {
    const screen = render(<CustomInput error errorMessage="Text is required" {...props} />);
    
    expect(screen.queryByText('Text is required')).toBeTruthy();
  });

  it('renders password <CustomInput />', async () => {
    const screen = render(<CustomInput secureTextEntry {...props} />);

    fireEvent.changeText(screen.getByTestId('text-input'), 'hellothere');

    expect(screen.getByTestId('text-input').props.value).not.toBe('hellothere');
  });
});
