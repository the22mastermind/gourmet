import React from 'react';
import { render, fireEvent, act } from 'test-utils';
import CustomButton from './CustomButton';

describe('<CustomButton /> component', () => {
  it('renders <CustomButton /> correctly', () => {
    const onPress = jest.fn();
    const screen = render(
      <CustomButton
        testID="my custom button"
        label="my custom button"
        modeValue="contained"
        onPress={onPress}
        loading={false}
      />);
  
    expect(screen.getByText('my custom button')).toBeTruthy();
  });
  
  it('calls onPress event correctly', async () => {
    const onPress = jest.fn();
    const screen = render(
      <CustomButton
        testID="my custom button"
        label="my custom button"
        modeValue="contained"
        onPress={onPress}
        loading={false}
      />);
    
    await act(async () => {
      fireEvent.press(screen.getByText('my custom button'));
    });
  
    expect(screen.getByText('my custom button')).toBeTruthy();
    expect(onPress).toHaveBeenCalledTimes(1);
  });
  
  it('matches <CustomButton /> component snapshot', async () => {
    const onPress = jest.fn();
    const screen = render(
      <CustomButton
        testID="my custom button"
        label="my custom button"
        modeValue="contained"
        onPress={onPress}
        loading={false}
      />);
  
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
