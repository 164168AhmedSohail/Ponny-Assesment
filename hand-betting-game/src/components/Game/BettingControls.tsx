import { memo } from 'react'
import { Box, Typography } from '@mui/material'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import { Button } from 'components/Common/Button'
import { BetType } from 'types/tile.types'

interface BettingControlsProps {
  onBet: (bet: BetType) => void
  isAnimating: boolean
  currentHandValue: number
}

export const BettingControls = memo(
  ({ onBet, isAnimating, currentHandValue }: BettingControlsProps) => {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="caption" color="text.secondary" fontWeight={600} letterSpacing={1}>
          CURRENT HAND VALUE:{' '}
          <Typography component="span" fontWeight={900} color="primary">
            {currentHandValue}
          </Typography>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Will the next hand be higher or lower?
        </Typography>
        <Box
          sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}
          role="group"
          aria-label="Betting options"
        >
          <Button
            onClick={() => onBet('higher')}
            disabled={isAnimating}
            ariaLabel="Bet that the next hand will be higher"
            size="large"
            color="success"
            startIcon={<TrendingUpIcon />}
          >
            Bet Higher
          </Button>
          <Button
            onClick={() => onBet('lower')}
            disabled={isAnimating}
            ariaLabel="Bet that the next hand will be lower"
            size="large"
            color="error"
            startIcon={<TrendingDownIcon />}
          >
            Bet Lower
          </Button>
        </Box>
      </Box>
    )
  }
)

BettingControls.displayName = 'BettingControls'
