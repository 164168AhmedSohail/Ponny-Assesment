import { useCallback } from 'react'
import {
  useAppDispatch,
  useAppSelector,
  selectGameState,
  selectScreen,
} from 'store/gameStore'
import {
  setGameState,
  setAnimating,
  setScreen,
  resetGame,
} from 'store/gameSlice'
import { gameEngine } from 'services/gameEngine.service'
import { BetType } from 'types/tile.types'
import { GAME_CONFIG } from 'constants/config.constants'

export function useGameEngine() {
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectGameState)
  const screen = useAppSelector(selectScreen)

  const startNewGame = useCallback(() => {
    const initial = gameEngine.initializeGame()
    dispatch(setGameState(initial))
    dispatch(setScreen('game'))
  }, [dispatch])

  const placeBet = useCallback(
    (bet: BetType) => {
      if (state.isAnimating || state.isGameOver || !state.currentHand) return

      dispatch(setAnimating(true))

      setTimeout(() => {
        const result = gameEngine.processBet(state, bet)
        const newState = gameEngine.applyBetResult(state, result)
        dispatch(setGameState(newState))
      }, GAME_CONFIG.ui.animationDurationMs)
    },
    [state, dispatch]
  )

  const exitGame = useCallback(() => {
    dispatch(setScreen('landing'))
  }, [dispatch])

  const resetToHome = useCallback(() => {
    dispatch(resetGame())
  }, [dispatch])

  return {
    state,
    screen,
    startNewGame,
    placeBet,
    exitGame,
    resetToHome,
  }
}
