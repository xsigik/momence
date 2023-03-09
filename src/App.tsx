import "./app.css";
import "./i18n";

import { Converter } from "./components/converter/converter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontSize: 14,
    h1: {
      fontSize: "3.5rem",
    },
    h2: {
      fontSize: "2.3rem",
    },
  },
});

const queryClient = new QueryClient({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Converter />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
