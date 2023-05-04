import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/system';
import Routes from './routes';
import theme from './theme';
import './index.css';

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
