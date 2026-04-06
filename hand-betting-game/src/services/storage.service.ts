import { GameState, LeaderboardEntry } from 'types/game.types'
import { STORAGE_KEYS, MAX_LEADERBOARD_ENTRIES } from 'constants/game.constants'

export class StorageService {
  saveGameState(state: GameState): void {
    try {
      localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(state))
    } catch {
      console.error('Failed to save game state')
    }
  }

  loadGameState(): GameState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.GAME_STATE)
      return raw ? (JSON.parse(raw) as GameState) : null
    } catch {
      return null
    }
  }

  clearGameState(): void {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE)
  }

  backupGameState(): void {
    try {
      const current = localStorage.getItem(STORAGE_KEYS.GAME_STATE)
      if (current) {
        localStorage.setItem(STORAGE_KEYS.GAME_STATE_BACKUP, current)
      }
    } catch {
      console.error('Failed to backup game state')
    }
  }

  saveLeaderboard(entries: LeaderboardEntry[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(entries))
    } catch {
      console.error('Failed to save leaderboard')
    }
  }

  loadLeaderboard(): LeaderboardEntry[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD)
      return raw ? (JSON.parse(raw) as LeaderboardEntry[]) : []
    } catch {
      return []
    }
  }

  addLeaderboardEntry(entry: LeaderboardEntry): LeaderboardEntry[] {
    const entries = this.loadLeaderboard()
    const updated = [...entries, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_LEADERBOARD_ENTRIES)
    this.saveLeaderboard(updated)
    return updated
  }
}

export const storageService = new StorageService()
