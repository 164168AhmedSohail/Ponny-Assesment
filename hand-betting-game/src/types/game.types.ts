import { Tile, BetType } from './tile.types'

export interface Hand {
  id: string
  tiles: Tile[]
  totalValue: number
  isWin: boolean
  bet: BetType
  timestamp: number
}

export interface LeaderboardEntry {
  id: string
  score: number
  date: number
  playerName: string
}

export interface GameState {
  currentScore: number
  currentHand: Hand | null
  previousHand: Hand | null
  drawPile: Tile[]
  discardPile: Tile[]
  history: Hand[]
  reshuffleCount: number
  isGameOver: boolean
  gameOverReason: 'tile_limit' | 'reshuffle_limit' | null
  isAnimating: boolean
  lastUpdated: number
  leaderboard: LeaderboardEntry[]
}

export interface BetResult {
  success: boolean
  newHand: Hand
  scoreDelta: number
  newScore: number
  isGameOver: boolean
  reason?: string
}

export type AppScreen = 'landing' | 'game'
