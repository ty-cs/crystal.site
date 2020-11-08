import { red } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core';

// Create a theme object.
const theme: ThemeOptions = {
  typography: {
    fontFamily: [
      'ui-rounded',
      'SF Pro Rounded',
      '-apple-system',
      'BlinkMacSystemFont',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
};

export default theme;
