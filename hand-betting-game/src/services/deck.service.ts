import { Tile } from 'types/tile.types'
import { createFullDeck } from 'constants/tile.constants'
import { GAME_CONFIG } from 'constants/config.constants'
import { HAND_SIZE } from 'constants/game.constants'
import { shuffleArray } from 'utils/shuffle.util'

export interface DrawResult {
  hand: Tile[]
  newDrawPile: Tile[]
  newDiscardPile: Tile[]
  reshuffled: boolean
  newReshuffleCount: number
}

export class DeckService {
  createShuffledDeck(): Tile[] {
    return shuffleArray(createFullDeck())
  }

  drawHand(
    drawPile: Tile[],
    discardPile: Tile[],
    reshuffleCount: number
  ): DrawResult {
    let currentDraw = [...drawPile]
    let currentDiscard = [...discardPile]
    let reshuffled = false
    let newReshuffleCount = reshuffleCount

    if (currentDraw.length < HAND_SIZE) {
      if (reshuffleCount >= GAME_CONFIG.deck.maxReshuffles) {
        // Signal that draw failed — caller handles game over
        return {
          hand: [],
          newDrawPile: currentDraw,
          newDiscardPile: currentDiscard,
          reshuffled: false,
          newReshuffleCount,
        }
      }
      // Reshuffle: add fresh deck + discard pile
      const freshDeck = createFullDeck()
      currentDraw = shuffleArray([...freshDeck, ...currentDiscard])
      currentDiscard = []
      reshuffled = true
      newReshuffleCount += 1
    }

    const hand = currentDraw.slice(0, HAND_SIZE)
    const newDrawPile = currentDraw.slice(HAND_SIZE)

    return {
      hand,
      newDrawPile,
      newDiscardPile: currentDiscard,
      reshuffled,
      newReshuffleCount,
    }
  }

  discardHand(hand: Tile[], discardPile: Tile[]): Tile[] {
    return [...discardPile, ...hand]
  }
}

export const deckService = new DeckService()
