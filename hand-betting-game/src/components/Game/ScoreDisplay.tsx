import { memo } from 'react'
import { Box, Typography, Chip } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

interface ScoreDisplayProps {
  score: number
  lastDelta?: number | null
}

export const ScoreDisplay = memo(({ score, lastDelta }: ScoreDisplayProps) => {
  const isPositive = lastDelta !== null && lastDelta !== undefined && lastDelta > 0
  const isNegative = lastDelta !== null && lastDelta !== undefined && lastDelta < 0

  return (
    <Box sx={{ textAlign: 'center' }} aria-live="polite" aria-label={`Score: ${score}`}>
      <Typography variant="caption" color="text.secondary" letterSpacing={1} fontWeight={600}>
        SCORE
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Typography variant="h3" fontWeight={900} component="p">
          {score.toLocaleString()}
        </Typography>
        {lastDelta !== null && lastDelta !== undefined && lastDelta !== 0 && (
          <Chip
            icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
            label={`${isPositive ? '+' : ''}${lastDelta}`}
            color={isPositive ? 'success' : 'error'}
            size="small"
            aria-label={`Score changed by ${lastDelta}`}
          />
        )}
      </Box>
      {isNegative && (
        <Typography variant="caption" color="error">
          Wrong bet!
        </Typography>
      )}
      {isPositive && (
        <Typography variant="caption" color="success.main">
          Correct bet!
        </Typography>
      )}
    </Box>
  )
})

ScoreDisplay.displayName = 'ScoreDisplay'
