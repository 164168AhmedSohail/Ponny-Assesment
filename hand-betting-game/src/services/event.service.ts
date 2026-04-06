import { Hand, GameState } from 'types/game.types'
import { Tile } from 'types/tile.types'

export type GameEvent =
  | 'handComplete'
  | 'gameOver'
  | 'scoreChange'
  | 'deckReshuffled'
  | 'tileValueChanged'

export interface EventPayloads {
  handComplete: { hand: Hand; scoreDelta: number }
  gameOver: { reason: GameState['gameOverReason']; finalScore: number }
  scoreChange: { newScore: number; delta: number }
  deckReshuffled: { reshuffleCount: number }
  tileValueChanged: { tile: Tile; oldValue: number; newValue: number }
}

type EventCallback<T> = (data: T) => void

class EventService {
  private listeners: Map<GameEvent, Array<EventCallback<unknown>>> = new Map()

  subscribe<K extends GameEvent>(
    event: K,
    callback: EventCallback<EventPayloads[K]>
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback as EventCallback<unknown>)

    return () => {
      const callbacks = this.listeners.get(event)
      if (callbacks) {
        const index = callbacks.indexOf(callback as EventCallback<unknown>)
        if (index > -1) callbacks.splice(index, 1)
      }
    }
  }

  emit<K extends GameEvent>(event: K, data: EventPayloads[K]): void {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach(cb => cb(data))
    }
  }

  removeAll(): void {
    this.listeners.clear()
  }
}

export const eventService = new EventService()
