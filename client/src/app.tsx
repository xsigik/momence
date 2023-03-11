import './i18n';

import { Converter } from './components/converter/converter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Container, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './errorBoundary';

const theme = createTheme({
  typography: {
    fontSize: 14,
    h1: {
      fontSize: '3.5rem',
    },
    h2: {
      fontSize: '2.3rem',
    },
  },
});

const queryClient = new QueryClient({});

const App = () => {
  const { t } = useTranslation();

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Container maxWidth="sm">
            <Container sx={{ pt: 2 }}>
              <Typography variant="h1" sx={{ mb: 2 }}>
                {t('title')}
              </Typography>
            </Container>
            <Converter />
          </Container>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
