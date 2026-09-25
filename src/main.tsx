import '@fontsource-variable/inter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TodosProvider } from './state/TodosProvider';
import { theme } from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <TodosProvider>
        <App />
      </TodosProvider>
    </ThemeProvider>
  </StrictMode>,
);
