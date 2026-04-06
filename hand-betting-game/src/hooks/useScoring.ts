import { useMemo } from 'react'
import { Hand } from 'types/game.types'
import { BetType } from 'types/tile.types'
import { scoringService } from 'services/scoring.service'

export function useScoring(
  currentHand: Hand | null,
  previousHand: Hand | null,
  pendingBet: BetType | null
) {
  const projectedDelta = useMemo(() => {
    if (!currentHand || !pendingBet) return null
    return scoringService.calculateScore(currentHand, pendingBet, previousHand)
  }, [currentHand, previousHand, pendingBet])

  return { projectedDelta }
}
