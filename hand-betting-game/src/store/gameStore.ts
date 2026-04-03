import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import gameReducer from './gameSlice'

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks — always use these instead of plain useDispatch / useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Selectors
export const selectGameState = (state: RootState) => state.game.game
export const selectScreen = (state: RootState) => state.game.screen
export const selectCurrentHand = (state: RootState) => state.game.game.currentHand
export const selectCurrentScore = (state: RootState) => state.game.game.currentScore
export const selectHistory = (state: RootState) => state.game.game.history
export const selectIsGameOver = (state: RootState) => state.game.game.isGameOver
export const selectIsAnimating = (state: RootState) => state.game.game.isAnimating
export const selectDeckInfo = (state: RootState) => ({
  drawPile: state.game.game.drawPile,
  discardPile: state.game.game.discardPile,
  reshuffleCount: state.game.game.reshuffleCount,
})
