import { red } from '@material-ui/core/colors';

// Create a theme object.
const theme = {
  typography: {
    fontFamily: [
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
