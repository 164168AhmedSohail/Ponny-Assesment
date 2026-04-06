import { Tile } from 'types/tile.types'
import { GAME_CONFIG } from 'constants/config.constants'

export function isTileAtLimit(tile: Tile): boolean {
  return tile.value <= GAME_CONFIG.tile.minValue || tile.value >= GAME_CONFIG.tile.maxValue
}

export function hasTileAtLimit(tiles: Tile[]): boolean {
  return tiles.some(isTileAtLimit)
}
