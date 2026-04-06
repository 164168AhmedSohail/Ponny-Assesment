import React from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { GameErrorBoundary } from 'components/ErrorBoundary'
import { StoreProvider } from 'store/store.provider'
import { LandingPage } from 'components/LandingPage/LandingPage'
import { Game } from 'components/Game/Game'
import { useAppSelector, selectScreen } from 'store/gameStore'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#F5C842', contrastText: '#0a0e27' },
    secondary: { main: '#7C4DFF', contrastText: '#ffffff' },
    success: { main: '#00C896', contrastText: '#0a0e27' },
    error: { main: '#FF4560', contrastText: '#ffffff' },
    warning: { main: '#FFA726', contrastText: '#0a0e27' },
    background: { default: '#0a0e27', paper: 'rgba(18, 22, 60, 0.90)' },
    text: { primary: '#E8EAF6', secondary: '#9FA8DA' },
    divider: 'rgba(245, 200, 66, 0.15)',
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    fontWeightBold: 700,
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          letterSpacing: '0.03em',
          borderRadius: 10,
          '&:focus-visible': {
            outline: '2px solid #F5C842',
            outlineOffset: 2,
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #F5C842 0%, #E8A800 100%)',
          color: '#0a0e27',
          boxShadow: '0 4px 20px rgba(245, 200, 66, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFD84D 0%, #F5C842 100%)',
            boxShadow: '0 6px 28px rgba(245, 200, 66, 0.55)',
          },
        },
        containedSuccess: {
          background: 'linear-gradient(135deg, #00C896 0%, #00A67A 100%)',
          color: '#0a0e27',
          boxShadow: '0 4px 16px rgba(0, 200, 150, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #00E0AA 0%, #00C896 100%)',
            boxShadow: '0 6px 24px rgba(0, 200, 150, 0.55)',
          },
        },
        containedError: {
          background: 'linear-gradient(135deg, #FF4560 0%, #D4002A 100%)',
          color: '#ffffff',
          boxShadow: '0 4px 16px rgba(255, 69, 96, 0.35)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF6B80 0%, #FF4560 100%)',
            boxShadow: '0 6px 24px rgba(255, 69, 96, 0.55)',
          },
        },
        outlinedSecondary: {
          borderColor: 'rgba(124, 77, 255, 0.6)',
          color: '#B39DDB',
          '&:hover': {
            borderColor: '#7C4DFF',
            background: 'rgba(124, 77, 255, 0.08)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(245, 200, 66, 0.12)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: 'rgba(245, 200, 66, 0.12)' },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700 },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: 'rgba(245, 200, 66, 0.10)' },
        head: { color: '#9FA8DA', fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.06em' },
      },
    },
  },
})

const AppContent: React.FC = () => {
  const screen = useAppSelector(selectScreen)
  return screen === 'landing' ? <LandingPage /> : <Game />
}

function App(): React.ReactElement {
  return (
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GameErrorBoundary>
          <AppContent />
        </GameErrorBoundary>
      </ThemeProvider>
    </StoreProvider>
  )
}

export default App
