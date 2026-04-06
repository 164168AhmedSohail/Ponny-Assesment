import { Hand } from 'types/game.types'
import { BetType, Tile } from 'types/tile.types'
import { GAME_CONFIG } from 'constants/config.constants'
import { clamp } from 'utils/helpers.util'

export interface IScoringStrategy {
  calculateScore(hand: Hand, bet: BetType, previousHand: Hand | null): number
}

export class DefaultScoringStrategy implements IScoringStrategy {
  calculateScore(hand: Hand, bet: BetType, previousHand: Hand | null): number {
    if (!previousHand) return hand.totalValue * GAME_CONFIG.scoring.winMultiplier

    const isHigher = hand.totalValue > previousHand.totalValue
    const isCorrect = (bet === 'higher' && isHigher) || (bet === 'lower' && !isHigher)

    if (isCorrect) {
      return hand.totalValue * GAME_CONFIG.scoring.winMultiplier
    }
    return -(hand.totalValue * GAME_CONFIG.scoring.lossMultiplier)
  }
}

export class BonusScoringStrategy implements IScoringStrategy {
  calculateScore(hand: Hand, bet: BetType, previousHand: Hand | null): number {
    if (!previousHand) return hand.totalValue

    const base = new DefaultScoringStrategy().calculateScore(hand, bet, previousHand)
    // Bonus: 25% extra for streaks (can be extended)
    return base > 0 ? Math.floor(base * 1.25) : base
  }
}

export function updateTileValuesAfterHand(tiles: Tile[], isWin: boolean): Tile[] {
  return tiles.map(tile => {
    if (tile.type === 'number') return tile
    const change = isWin
      ? GAME_CONFIG.tile.valueChangeOnWin
      : GAME_CONFIG.tile.valueChangeOnLoss
    const newValue = clamp(
      tile.value + change,
      GAME_CONFIG.tile.minValue,
      GAME_CONFIG.tile.maxValue
    )
    return { ...tile, value: newValue }
  })
}

export const scoringService = new DefaultScoringStrategy()
