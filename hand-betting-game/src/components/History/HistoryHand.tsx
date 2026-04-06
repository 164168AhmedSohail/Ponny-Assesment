import { memo } from 'react'
import { Box, Typography, Chip } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import { Hand } from 'types/game.types'
import { TileStack } from 'components/Game/TileStack'

interface HistoryHandProps {
  hand: Hand
  index: number
}

export const HistoryHand = memo(({ hand, index }: HistoryHandProps) => {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: 2,
        border: '1px solid',
        borderColor: hand.isWin ? 'success.light' : 'error.light',
        bgcolor: hand.isWin ? 'success.50' : 'error.50',
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
      aria-label={`Hand ${index + 1}: ${hand.isWin ? 'Win' : 'Loss'}, total ${hand.totalValue}`}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Hand #{index + 1}
        </Typography>
        <Chip
          icon={hand.isWin ? <TrendingUpIcon /> : <TrendingDownIcon />}
          label={hand.isWin ? 'Win' : 'Loss'}
          color={hand.isWin ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
      </Box>

      <TileStack tiles={hand.tiles} isSmall label={`Tiles for hand ${index + 1}`} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" color="text.secondary">
          Bet: {hand.bet}
        </Typography>
        <Typography variant="caption" fontWeight={700}>
          Total: {hand.totalValue}
        </Typography>
      </Box>
    </Box>
  )
})

HistoryHand.displayName = 'HistoryHand'
