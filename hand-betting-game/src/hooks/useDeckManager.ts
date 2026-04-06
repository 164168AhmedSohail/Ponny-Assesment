import { useMemo } from 'react'
import { Tile } from 'types/tile.types'

export interface DeckInfo {
  drawCount: number
  discardCount: number
  totalCount: number
  reshuffleCount: number
  maxReshuffles: number
}

export function useDeckManager(
  drawPile: Tile[],
  discardPile: Tile[],
  reshuffleCount: number,
  maxReshuffles: number
): DeckInfo {
  return useMemo(
    () => ({
      drawCount: drawPile.length,
      discardCount: discardPile.length,
      totalCount: drawPile.length + discardPile.length,
      reshuffleCount,
      maxReshuffles,
    }),
    [drawPile.length, discardPile.length, reshuffleCount, maxReshuffles]
  )
}
