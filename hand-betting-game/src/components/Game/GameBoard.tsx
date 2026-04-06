import { memo } from 'react'
import { Box, Typography, Divider, Fade } from '@mui/material'
import { Hand } from 'types/game.types'
import { TileStack } from './TileStack'
import { ScoreDisplay } from './ScoreDisplay'
import { BettingControls } from './BettingControls'
import { DeckInfo } from './DeckInfo'
import { BetType } from 'types/tile.types'
import { DeckInfo as DeckInfoType } from 'hooks/useDeckManager'

interface GameBoardProps {
  currentHand: Hand
  currentScore: number
  lastDelta: number | null
  isAnimating: boolean
  deckInfo: DeckInfoType
  onBet: (bet: BetType) => void
}

export const GameBoard = memo(
  ({ currentHand, currentScore, lastDelta, isAnimating, deckInfo, onBet }: GameBoardProps) => {
    return (
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        role="main"
        aria-label="Game board"
      >
        <ScoreDisplay score={currentScore} lastDelta={lastDelta} />

        <Divider />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="overline" color="text.secondary" letterSpacing={2}>
            Current Hand
          </Typography>
          <Fade in={!isAnimating} timeout={300}>
            <Box sx={{ mt: 1 }}>
              <TileStack tiles={currentHand.tiles} label="Current hand tiles" />
              <Typography variant="h6" fontWeight={700} sx={{ mt: 1 }} aria-live="polite">
                Total: {currentHand.totalValue}
              </Typography>
            </Box>
          </Fade>
        </Box>

        <Divider />

        <BettingControls
          onBet={onBet}
          isAnimating={isAnimating}
          currentHandValue={currentHand.totalValue}
        />

        <Divider />

        <DeckInfo deckInfo={deckInfo} />
      </Box>
    )
  }
)

GameBoard.displayName = 'GameBoard'
