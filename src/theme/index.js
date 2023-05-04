import { createTheme } from '@mui/system';

const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  palette: {
    background: {
      paper: '#fff',
    },
    primary: {
      main: '#000',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

export default theme;
