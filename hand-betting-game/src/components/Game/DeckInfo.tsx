import { memo } from 'react'
import { Box, Typography, LinearProgress, Chip } from '@mui/material'
import StyleIcon from '@mui/icons-material/Style'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep'
import { DeckInfo as DeckInfoType } from 'hooks/useDeckManager'

interface DeckInfoProps {
  deckInfo: DeckInfoType
}

export const DeckInfo = memo(({ deckInfo }: DeckInfoProps) => {
  const { drawCount, discardCount, reshuffleCount, maxReshuffles } = deckInfo
  const totalOriginal = 136
  const progress = Math.min((drawCount / totalOriginal) * 100, 100)

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      aria-label="Deck information"
      role="region"
    >
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Chip
          icon={<StyleIcon fontSize="small" />}
          label={`Draw: ${drawCount}`}
          size="small"
          color="primary"
          variant="outlined"
          aria-label={`Draw pile: ${drawCount} tiles`}
        />
        <Chip
          icon={<DeleteSweepIcon fontSize="small" />}
          label={`Discard: ${discardCount}`}
          size="small"
          variant="outlined"
          aria-label={`Discard pile: ${discardCount} tiles`}
        />
        <Chip
          label={`Reshuffles: ${reshuffleCount}/${maxReshuffles}`}
          size="small"
          color={reshuffleCount >= maxReshuffles - 1 ? 'warning' : 'default'}
          variant="outlined"
          aria-label={`Reshuffles used: ${reshuffleCount} of ${maxReshuffles}`}
        />
      </Box>
      <Box>
        <LinearProgress
          variant="determinate"
          value={progress}
          color={progress < 20 ? 'warning' : 'primary'}
          aria-label={`Draw pile ${Math.round(progress)}% remaining`}
          sx={{ borderRadius: 1, height: 6 }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.25, display: 'block', textAlign: 'center' }}>
          {drawCount} tiles remaining
        </Typography>
      </Box>
    </Box>
  )
})

DeckInfo.displayName = 'DeckInfo'
