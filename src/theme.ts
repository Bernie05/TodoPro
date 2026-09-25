import { createTheme } from '@mui/material/styles';

/**
 * One theme, two colour schemes. With `cssVariables` MUI emits CSS custom
 * properties and switches light/dark without re-rendering the React tree.
 */
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#2563eb' },
        success: { main: '#10b981', contrastText: '#fff' },
        error: { main: '#ef4444' },
        background: { default: '#fafaf9', paper: '#ffffff' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#3b82f6' },
        success: { main: '#10b981', contrastText: '#fff' },
        error: { main: '#f87171' },
        background: { default: '#09090b', paper: '#18181b' },
      },
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Inter Variable", system-ui, -apple-system, "Segoe UI", sans-serif',
    h4: { fontWeight: 700, letterSpacing: '-0.5px' },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiPaper: { defaultProps: { variant: 'outlined' } },
    MuiTextField: { defaultProps: { size: 'small', fullWidth: true } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
});
