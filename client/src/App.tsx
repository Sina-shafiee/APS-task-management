import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { dark, light } from './theme';
import { useColors } from './hooks';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes/Routes';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

function App() {
  const { isDark } = useColors();

  return (
    <ThemeProvider theme={isDark ? createTheme(dark) : createTheme(light)}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <Routes />
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          theme={isDark ? 'dark' : 'light'}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
