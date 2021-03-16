import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#a4c49a',
    accent: '#f7f8f8',
    text: '#333333',
    error: '#f44336',
    placeholder: '#777777',
    link: '#a4c49a',
    buttonText: '#ffffff',
  },
};

export default theme;
