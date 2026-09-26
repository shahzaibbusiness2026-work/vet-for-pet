'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006B4F',
      dark: '#00523C',
      light: '#0E8F63',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAF8F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#02231A',
      secondary: '#475569',
    },
    divider: 'rgba(6, 78, 59, 0.1)',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 800,
      color: '#02231A',
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 800,
      color: '#02231A',
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      color: '#02231A',
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 700,
      color: '#02231A',
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
      color: '#02231A',
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontWeight: 600,
      color: '#02231A',
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          padding: '10px 24px',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 20px -4px rgba(0, 107, 79, 0.25)',
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          backgroundColor: '#006B4F',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#00523C',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          boxShadow: '0 4px 20px -4px rgba(0, 107, 79, 0.06)',
          border: '1px solid rgba(6, 78, 59, 0.08)',
        },
      },
    },
  },
});
