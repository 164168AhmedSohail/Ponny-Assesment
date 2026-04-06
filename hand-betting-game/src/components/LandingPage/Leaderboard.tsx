import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { LeaderboardEntry } from 'types/game.types'
import { formatDate } from 'utils/helpers.util'

interface LeaderboardProps {
  entries: LeaderboardEntry[]
}

const MEDAL_COLORS: Array<'warning' | 'default' | 'default'> = ['warning', 'default', 'default']
const RANK_LABELS = ['🥇', '🥈', '🥉']

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary" variant="body2">
          No scores yet. Start playing to set a high score!
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <EmojiEventsIcon color="warning" />
        <Typography variant="h6" fontWeight={700}>
          Top Scores
        </Typography>
      </Box>
      <Table size="small" aria-label="Leaderboard">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Player</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry, idx) => (
            <TableRow
              key={entry.id}
              sx={{ '&:last-child td': { border: 0 } }}
              aria-label={`Rank ${idx + 1}: ${entry.playerName} with score ${entry.score}`}
            >
              <TableCell>
                <Chip
                  label={RANK_LABELS[idx] ?? `#${idx + 1}`}
                  color={MEDAL_COLORS[idx] ?? 'default'}
                  size="small"
                  variant={idx === 0 ? 'filled' : 'outlined'}
                />
              </TableCell>
              <TableCell>{entry.playerName}</TableCell>
              <TableCell align="right">
                <Typography fontWeight={700} color="primary">
                  {entry.score.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="caption" color="text.secondary">
                  {formatDate(entry.date)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
