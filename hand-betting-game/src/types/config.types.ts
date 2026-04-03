export interface GameConfig {
  tile: {
    nonNumberStartValue: number
    maxValue: number
    minValue: number
    valueChangeOnWin: number
    valueChangeOnLoss: number
  }
  deck: {
    initialDeckSize: number
    maxReshuffles: number
  }
  scoring: {
    winMultiplier: number
    lossMultiplier: number
  }
  ui: {
    historyLimit: number
    animationDurationMs: number
  }
}
