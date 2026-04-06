import { GameEngine } from './gameEngine.service'
import { GAME_CONFIG } from 'constants/config.constants'

describe('GameEngine', () => {
  let gameEngine: GameEngine

  beforeEach(() => {
    gameEngine = new GameEngine()
  })

  describe('initializeGame', () => {
    it('returns a valid initial game state', () => {
      const state = gameEngine.initializeGame()
      expect(state.currentScore).toBe(0)
      expect(state.currentHand).not.toBeNull()
      expect(state.isGameOver).toBe(false)
      expect(state.reshuffleCount).toBe(0)
      expect(state.drawPile.length).toBeGreaterThan(0)
    })

    it('deals a hand of 4 tiles initially', () => {
      const state = gameEngine.initializeGame()
      expect(state.currentHand?.tiles).toHaveLength(4)
    })
  })

  describe('processBet', () => {
    it('returns a BetResult with a new hand', () => {
      const state = gameEngine.initializeGame()
      const result = gameEngine.processBet(state, 'higher')
      expect(result.newHand.tiles).toHaveLength(4)
    })

    it('updates score on win', () => {
      const state = gameEngine.initializeGame()
      const result = gameEngine.processBet(state, 'higher')
      if (result.success && result.isGameOver === false) {
        expect(typeof result.newScore).toBe('number')
      }
    })

    it('returns isGameOver true when reshuffle limit exceeded', () => {
      const state = gameEngine.initializeGame()
      // Exhaust draw pile
      const exhausted = {
        ...state,
        drawPile: [],
        reshuffleCount: GAME_CONFIG.deck.maxReshuffles,
      }
      const result = gameEngine.processBet(exhausted, 'higher')
      expect(result.isGameOver).toBe(true)
      expect(result.reason).toBe('reshuffle_limit')
    })
  })

  describe('applyBetResult', () => {
    it('updates currentHand and history after a bet', () => {
      const state = gameEngine.initializeGame()
      const result = gameEngine.processBet(state, 'higher')
      if (!result.success) return
      const newState = gameEngine.applyBetResult(state, result)
      expect(newState.currentHand?.id).toBe(result.newHand.id)
      expect(newState.currentScore).toBe(result.newScore)
    })

    it('marks game over when result is game over', () => {
      const state = gameEngine.initializeGame()
      const gameOverResult = {
        success: false,
        newHand: state.currentHand!,
        scoreDelta: 0,
        newScore: 0,
        isGameOver: true,
        reason: 'reshuffle_limit',
      }
      const newState = gameEngine.applyBetResult(state, gameOverResult)
      expect(newState.isGameOver).toBe(true)
    })
  })
})
