import React, { useCallback } from 'react'
import { Typography, Box, Divider } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import RestoreIcon from '@mui/icons-material/Restore'
import { Button } from 'components/Common/Button'
import { Card } from 'components/Common/Card'
import { Leaderboard } from './Leaderboard'
import { useAppDispatch, useAppSelector, selectGameState, selectScreen } from 'store/gameStore'
import { setScreen } from 'store/gameSlice'
import { useGameEngine } from 'hooks/useGameEngine'
import { storageService } from 'services/storage.service'
import styles from './LandingPage.module.scss'

export const LandingPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectGameState)
  const screen = useAppSelector(selectScreen)
  const { startNewGame } = useGameEngine()

  const hasSavedGame =
    state.currentHand !== null && !state.isGameOver && state.lastUpdated > 0

  const leaderboard = storageService.loadLeaderboard()

  const handleNewGame = useCallback(() => {
    startNewGame()
  }, [startNewGame])

  const handleContinue = useCallback(() => {
    dispatch(setScreen('game'))
  }, [dispatch])

  // screen is consumed by AppContent — this avoids lint warning
  void screen

  return (
    <main className={styles.root} aria-label="Landing page">
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.iconWrap} aria-hidden="true">🀄</div>
          <Typography className={styles.title} component="h1" aria-label="Hand Betting Game">
            Hand Betting Game
          </Typography>
          <Typography className={styles.subtitle} component="p">
            Mahjong Tile Betting — Predict Higher or Lower
          </Typography>
        </div>

        <Card elevation={0} className={styles.card}>
          <Box className={styles.actions}>
            <Button
              onClick={handleNewGame}
              ariaLabel="Start a new game"
              size="large"
              fullWidth
              startIcon={<PlayArrowIcon />}
              color="primary"
            >
              New Game
            </Button>

            {hasSavedGame && (
              <>
                <Button
                  onClick={handleContinue}
                  ariaLabel="Continue saved game"
                  size="large"
                  fullWidth
                  variant="outlined"
                  startIcon={<RestoreIcon />}
                  color="secondary"
                >
                  Continue Game
                </Button>
                <Typography className={styles.continueNote}>
                  Score: {state.currentScore.toLocaleString()} — Hand #{state.history.length + 1}
                </Typography>
              </>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          <Leaderboard entries={leaderboard} />
        </Card>
      </div>
    </main>
  )
}
