import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import { Hand } from 'types/game.types'
import { HistoryHand } from './HistoryHand'

interface HistoryPanelProps {
  history: Hand[]
  currentHand: Hand | null
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history }) => {
  return (
    <Box aria-label="Hand history" role="region">
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <HistoryIcon color="action" fontSize="small" />
        <Typography variant="subtitle1" fontWeight={700}>
          History
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ({history.length} hands)
        </Typography>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      {history.length === 0 ? (
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 2 }}>
          No hands played yet.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            maxHeight: { xs: 400, md: 'calc(100vh - 200px)' },
            overflowY: 'auto',
            pr: 0.5,
          }}
          role="list"
          aria-label="Previous hands"
        >
          {history.map((hand, idx) => (
            <Box key={hand.id} role="listitem">
              <HistoryHand hand={hand} index={idx} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
