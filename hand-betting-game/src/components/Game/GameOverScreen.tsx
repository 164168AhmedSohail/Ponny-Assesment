import React, { useState, useCallback } from 'react'
import {
  Box,
  Typography,
  TextField,
  Divider,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import HomeIcon from '@mui/icons-material/Home'
import SaveIcon from '@mui/icons-material/Save'
import ReplayIcon from '@mui/icons-material/Replay'
import { Button } from 'components/Common/Button'
import { GameState } from 'types/game.types'
import { storageService } from 'services/storage.service'
import { generateId } from 'utils/helpers.util'

interface GameOverScreenProps {
  state: GameState
  onNewGame: () => void
  onGoHome: () => void
}

const REASON_MESSAGES: Record<string, string> = {
  tile_limit: 'A tile reached its value limit (0 or 10)!',
  reshuffle_limit: 'The deck was reshuffled 3 times!',
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  state,
  onNewGame,
  onGoHome,
}) => {
  const [playerName, setPlayerName] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = useCallback(() => {
    if (!playerName.trim()) return
    storageService.addLeaderboardEntry({
      id: generateId(),
      score: state.currentScore,
      date: Date.now(),
      playerName: playerName.trim(),
    })
    setSaved(true)
  }, [playerName, state.currentScore])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        py: 4,
        textAlign: 'center',
      }}
      aria-live="assertive"
      role="alert"
    >
      <Typography variant="h4" fontWeight={900}>
        Game Over
      </Typography>

      {state.gameOverReason && (
        <Typography color="text.secondary">
          {REASON_MESSAGES[state.gameOverReason] ?? 'Game ended.'}
        </Typography>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EmojiEventsIcon color="warning" sx={{ fontSize: 36 }} />
        <Typography variant="h3" fontWeight={900} color="primary">
          {state.currentScore.toLocaleString()}
        </Typography>
      </Box>

      <Typography color="text.secondary" variant="body2">
        Hands played: {state.history.length}
      </Typography>

      <Divider sx={{ width: '100%' }} />

      {!saved ? (
        <Box sx={{ display: 'flex', gap: 1, width: '100%', maxWidth: 320 }}>
          <TextField
            label="Your name"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            size="small"
            fullWidth
            inputProps={{ 'aria-label': 'Enter your name for the leaderboard', maxLength: 20 }}
            onKeyDown={e => { if (e.key === 'Enter') handleSave() }}
          />
          <Button
            onClick={handleSave}
            disabled={!playerName.trim()}
            ariaLabel="Save score to leaderboard"
            startIcon={<SaveIcon />}
            color="warning"
          >
            Save
          </Button>
        </Box>
      ) : (
        <Typography color="success.main" fontWeight={600}>
          Score saved to leaderboard!
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          onClick={onNewGame}
          ariaLabel="Start a new game"
          startIcon={<ReplayIcon />}
          color="primary"
        >
          Play Again
        </Button>
        <Button
          onClick={onGoHome}
          ariaLabel="Return to home screen"
          variant="outlined"
          startIcon={<HomeIcon />}
          color="inherit"
        >
          Home
        </Button>
      </Box>
    </Box>
  )
}
