import React from 'react'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { GameErrorBoundary } from 'components/ErrorBoundary'
import { StoreProvider } from 'store/store.provider'
import { LandingPage } from 'components/LandingPage/LandingPage'
import { Game } from 'components/Game/Game'
import { useAppSelector, selectScreen } from 'store/gameStore'

const theme = createTheme({
  palette: {
    primary: { main: '#2c3e50' },
    secondary: { main: '#8e44ad' },
    success: { main: '#27ae60' },
    error: { main: '#c0392b' },
    warning: { main: '#f39c12' },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica Neue', Arial, sans-serif",
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          '&:focus-visible': {
            outline: '2px solid currentColor',
            outlineOffset: 2,
          },
        },
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
