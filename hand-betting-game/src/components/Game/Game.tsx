import React, { useState, useCallback } from 'react'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import HistoryIcon from '@mui/icons-material/History'
import { Card } from 'components/Common/Card'
import { GameBoard } from './GameBoard'
import { GameOverScreen } from './GameOverScreen'
import { HistoryPanel } from 'components/History/HistoryPanel'
import { useGameEngine } from 'hooks/useGameEngine'
import { useDeckManager } from 'hooks/useDeckManager'
import { GAME_CONFIG } from 'constants/config.constants'

export const Game: React.FC = () => {
  const { state, placeBet, startNewGame, exitGame } = useGameEngine()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [historyOpen, setHistoryOpen] = useState(false)

  const deckInfo = useDeckManager(
    state.drawPile,
    state.discardPile,
    state.reshuffleCount,
    GAME_CONFIG.deck.maxReshuffles
  )

  const lastDelta =
    state.history.length > 0 && state.currentHand
      ? state.currentScore -
        (state.history[0]?.isWin
          ? state.currentScore - state.history[0].totalValue
          : state.currentScore + state.history[0].totalValue)
      : null

  const handleExit = useCallback(() => {
    exitGame()
  }, [exitGame])

  const handleNewGame = useCallback(() => {
    startNewGame()
  }, [startNewGame])

  const historyPanel = (
    <HistoryPanel history={state.history} currentHand={state.currentHand} />
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1 }} component="h1">
            🀄 Hand Betting Game
          </Typography>
          {isMobile && (
            <IconButton
              aria-label="View hand history"
              onClick={() => setHistoryOpen(true)}
              color="inherit"
            >
              <HistoryIcon />
            </IconButton>
          )}
          <IconButton
            aria-label="Exit game and return to home"
            onClick={handleExit}
            color="inherit"
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          gap: 2,
          p: { xs: 1, sm: 2 },
          maxWidth: 1280,
          mx: 'auto',
          width: '100%',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Card elevation={3}>
            {state.isGameOver ? (
              <GameOverScreen
                state={state}
                onNewGame={handleNewGame}
                onGoHome={handleExit}
              />
            ) : state.currentHand ? (
              <GameBoard
                currentHand={state.currentHand}
                currentScore={state.currentScore}
                lastDelta={lastDelta}
                isAnimating={state.isAnimating}
                deckInfo={deckInfo}
                onBet={placeBet}
              />
            ) : null}
          </Card>
        </Box>

        {/* Desktop history sidebar */}
        {!isMobile && (
          <Box sx={{ width: 280, flexShrink: 0 }}>
            <Card elevation={2} sx={{ position: 'sticky', top: 80 }}>
              {historyPanel}
            </Card>
          </Box>
        )}
      </Box>

      {/* Mobile history drawer */}
      <Drawer
        anchor="right"
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        PaperProps={{ sx: { width: 300, p: 2 } }}
        aria-label="Hand history drawer"
      >
        {historyPanel}
      </Drawer>
    </Box>
  )
}
