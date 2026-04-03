import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GameState, AppScreen, LeaderboardEntry } from 'types/game.types'
import { Hand } from 'types/game.types'
import { Tile } from 'types/tile.types'
import { storageService } from 'services/storage.service'
import { GAME_CONFIG } from 'constants/config.constants'

export interface RootGameState {
  game: GameState
  screen: AppScreen
}

const EMPTY_GAME_STATE: GameState = {
  currentScore: 0,
  currentHand: null,
  previousHand: null,
  drawPile: [],
  discardPile: [],
  history: [],
  reshuffleCount: 0,
  isGameOver: false,
  gameOverReason: null,
  isAnimating: false,
  lastUpdated: 0,
  leaderboard: [],
}

function loadPersistedState(): GameState {
  const saved = storageService.loadGameState()
  return saved ?? EMPTY_GAME_STATE
}

const initialState: RootGameState = {
  game: loadPersistedState(),
  screen: 'landing',
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameState(state, action: PayloadAction<GameState>) {
      state.game = action.payload
      storageService.saveGameState(action.payload)
    },

    setAnimating(state, action: PayloadAction<boolean>) {
      state.game.isAnimating = action.payload
    },

    setScreen(state, action: PayloadAction<AppScreen>) {
      state.screen = action.payload
    },

    resetGame(state) {
      storageService.clearGameState()
      state.game = EMPTY_GAME_STATE
      state.screen = 'landing'
    },

    // Fine-grained actions for extension readiness
    updateCurrentHand(state, action: PayloadAction<Hand>) {
      state.game.currentHand = action.payload
    },

    updateScore(state, action: PayloadAction<number>) {
      state.game.currentScore = action.payload
    },

    updateDeck(
      state,
      action: PayloadAction<{ drawPile: Tile[]; discardPile: Tile[]; reshuffleCount: number }>
    ) {
      state.game.drawPile = action.payload.drawPile
      state.game.discardPile = action.payload.discardPile
      state.game.reshuffleCount = action.payload.reshuffleCount
    },

    addToHistory(state, action: PayloadAction<Hand>) {
      state.game.history = [action.payload, ...state.game.history].slice(
        0,
        GAME_CONFIG.ui.historyLimit
      )
    },

    setGameOver(
      state,
      action: PayloadAction<GameState['gameOverReason']>
    ) {
      state.game.isGameOver = true
      state.game.gameOverReason = action.payload
    },

    addLeaderboardEntry(state, action: PayloadAction<LeaderboardEntry>) {
      const updated = storageService.addLeaderboardEntry(action.payload)
      state.game.leaderboard = updated
    },
  },
})

export const {
  setGameState,
  setAnimating,
  setScreen,
  resetGame,
  updateCurrentHand,
  updateScore,
  updateDeck,
  addToHistory,
  setGameOver,
  addLeaderboardEntry,
} = gameSlice.actions

export default gameSlice.reducer
