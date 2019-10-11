import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#fafafb',
      main: '#ffffff',
      dark: '#616161',
      contrastText: '#000000',
    },
  },
  typography: {
    subtitle2: {
      color: '#4f5b66',
      fontWeight: 300,
    },
    subtitle1: {
      color: '#4f5b66',
      fontWeight: 300,
    },
    h1: {
      color: '#1d2227',
    },
    h2: {
      color: '#1d2227',
    },
    h3: {
      color: '#1d2227',
    },
    h4: {
      color: '#1d2227',
    },
    h5: {
      color: '#1d2227',
    },
  },
});


export default theme;
