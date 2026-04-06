import { GameConfig } from 'types/config.types'

export const GAME_CONFIG: GameConfig = {
  tile: {
    nonNumberStartValue: 5,
    maxValue: 10,
    minValue: 0,
    valueChangeOnWin: 1,
    valueChangeOnLoss: -1,
  },
  deck: {
    initialDeckSize: 136,
    maxReshuffles: 3,
  },
  scoring: {
    winMultiplier: 1,
    lossMultiplier: 1,
  },
  ui: {
    historyLimit: 10,
    animationDurationMs: 400,
  },
}
