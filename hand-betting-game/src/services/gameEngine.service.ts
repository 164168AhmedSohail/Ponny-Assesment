import { GameState, Hand, BetResult } from 'types/game.types'
import { BetType, Tile } from 'types/tile.types'
import { deckService } from './deck.service'
import { scoringService, updateTileValuesAfterHand } from './scoring.service'
import { eventService } from './event.service'
import { GAME_CONFIG } from 'constants/config.constants'
import { hasTileAtLimit } from 'utils/validation.util'
import { generateId } from 'utils/helpers.util'

export class GameEngine {
  initializeGame(): GameState {
    const drawPile = deckService.createShuffledDeck()
    const { hand, newDrawPile } = deckService.drawHand(drawPile, [], 0)

    const firstHand: Hand = {
      id: generateId(),
      tiles: hand,
      totalValue: this.sumTiles(hand),
      isWin: true,
      bet: 'higher',
      timestamp: Date.now(),
    }

    return {
      currentScore: 0,
      currentHand: firstHand,
      previousHand: null,
      drawPile: newDrawPile,
      discardPile: [],
      history: [],
      reshuffleCount: 0,
      isGameOver: false,
      gameOverReason: null,
      isAnimating: false,
      lastUpdated: Date.now(),
      leaderboard: [],
    }
  }

  processBet(state: GameState, bet: BetType): BetResult {
    const { drawPile, discardPile, reshuffleCount, currentHand, currentScore } = state

    // Draw new hand
    const drawResult = deckService.drawHand(drawPile, discardPile, reshuffleCount)

    // Game over: reshuffle limit exceeded
    if (drawResult.hand.length === 0) {
      eventService.emit('gameOver', { reason: 'reshuffle_limit', finalScore: currentScore })
      return {
        success: false,
        newHand: currentHand!,
        scoreDelta: 0,
        newScore: currentScore,
        isGameOver: true,
        reason: 'reshuffle_limit',
      }
    }

    if (drawResult.reshuffled) {
      eventService.emit('deckReshuffled', { reshuffleCount: drawResult.newReshuffleCount })
    }

    // Update non-number tile values based on previous hand result
    let drawnTiles: Tile[] = drawResult.hand
    if (currentHand) {
      const prevIsWin = currentHand.isWin
      drawnTiles = updateTileValuesAfterHand(drawResult.hand, prevIsWin)
    }

    const newHandValue = this.sumTiles(drawnTiles)
    const scoreDelta = scoringService.calculateScore(
      { id: '', tiles: drawnTiles, totalValue: newHandValue, isWin: false, bet, timestamp: Date.now() },
      bet,
      currentHand
    )
    const isWin = scoreDelta > 0
    const newScore = currentScore + scoreDelta

    const newHand: Hand = {
      id: generateId(),
      tiles: drawnTiles,
      totalValue: newHandValue,
      isWin,
      bet,
      timestamp: Date.now(),
    }

    // Check tile limit game-over
    const gameOverByTile = hasTileAtLimit(drawnTiles)
    const gameOverByReshuffle =
      drawResult.newReshuffleCount >= GAME_CONFIG.deck.maxReshuffles &&
      drawResult.reshuffled

    const isGameOver = gameOverByTile || gameOverByReshuffle
    const gameOverReason = gameOverByTile
      ? 'tile_limit'
      : gameOverByReshuffle
      ? 'reshuffle_limit'
      : null

    eventService.emit('handComplete', { hand: newHand, scoreDelta })
    eventService.emit('scoreChange', { newScore, delta: scoreDelta })

    if (isGameOver) {
      eventService.emit('gameOver', { reason: gameOverReason, finalScore: newScore })
    }

    return {
      success: true,
      newHand,
      scoreDelta,
      newScore,
      isGameOver,
      reason: gameOverReason ?? undefined,
    }
  }

  applyBetResult(state: GameState, result: BetResult): GameState {
    if (!result.success) {
      return {
        ...state,
        isGameOver: true,
        gameOverReason: 'reshuffle_limit',
        lastUpdated: Date.now(),
      }
    }

    const { drawPile, discardPile, reshuffleCount } = state
    const drawResult = deckService.drawHand(drawPile, discardPile, reshuffleCount)

    const updatedHistory = state.currentHand
      ? [state.currentHand, ...state.history].slice(0, GAME_CONFIG.ui.historyLimit)
      : state.history

    return {
      ...state,
      currentScore: result.newScore,
      previousHand: state.currentHand,
      currentHand: result.newHand,
      drawPile: drawResult.newDrawPile,
      discardPile: drawResult.reshuffled
        ? drawResult.newDiscardPile
        : deckService.discardHand(state.currentHand?.tiles ?? [], state.discardPile),
      reshuffleCount: drawResult.newReshuffleCount,
      history: updatedHistory,
      isGameOver: result.isGameOver,
      gameOverReason: (result.reason as GameState['gameOverReason']) ?? null,
      isAnimating: false,
      lastUpdated: Date.now(),
    }
  }

  private sumTiles(tiles: Tile[]): number {
    return tiles.reduce((sum, t) => sum + t.value, 0)
  }
}

export const gameEngine = new GameEngine()
