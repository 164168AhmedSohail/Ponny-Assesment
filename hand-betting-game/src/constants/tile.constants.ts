import { Tile, TileSuit, DragonType, WindType } from 'types/tile.types'
import { GAME_CONFIG } from './config.constants'

let tileCounter = 0

function createNumberTile(suit: TileSuit, faceValue: number, symbol: string): Tile {
  return {
    id: `tile_${++tileCounter}`,
    type: 'number',
    suit,
    value: faceValue,
    baseValue: faceValue,
    displayName: `${faceValue} ${suit}`,
    faceValue,
    symbol,
  }
}

function createDragonTile(dragonType: DragonType, symbol: string, displayName: string): Tile {
  return {
    id: `tile_${++tileCounter}`,
    type: 'dragon',
    suit: 'dragon',
    value: GAME_CONFIG.tile.nonNumberStartValue,
    baseValue: GAME_CONFIG.tile.nonNumberStartValue,
    displayName,
    dragonType,
    symbol,
  }
}

function createWindTile(windType: WindType, symbol: string, displayName: string): Tile {
  return {
    id: `tile_${++tileCounter}`,
    type: 'wind',
    suit: 'wind',
    value: GAME_CONFIG.tile.nonNumberStartValue,
    baseValue: GAME_CONFIG.tile.nonNumberStartValue,
    displayName,
    windType,
    symbol,
  }
}

// Mahjong number suit symbols
const WAN_SYMBOLS = ['🀇', '🀈', '🀉', '🀊', '🀋', '🀌', '🀍', '🀎', '🀏']
const TONG_SYMBOLS = ['🀙', '🀚', '🀛', '🀜', '🀝', '🀞', '🀟', '🀠', '🀡']
const TIAO_SYMBOLS = ['🀐', '🀑', '🀒', '🀓', '🀔', '🀕', '🀖', '🀗', '🀘']

const DRAGON_CONFIG: Array<{ type: DragonType; symbol: string; name: string }> = [
  { type: 'red', symbol: '🀄', name: 'Red Dragon (中)' },
  { type: 'green', symbol: '🀅', name: 'Green Dragon (發)' },
  { type: 'white', symbol: '🀆', name: 'White Dragon (白)' },
]

const WIND_CONFIG: Array<{ type: WindType; symbol: string; name: string }> = [
  { type: 'east', symbol: '🀀', name: 'East Wind (東)' },
  { type: 'south', symbol: '🀁', name: 'South Wind (南)' },
  { type: 'west', symbol: '🀂', name: 'West Wind (西)' },
  { type: 'north', symbol: '🀃', name: 'North Wind (北)' },
]

export function createFullDeck(): Tile[] {
  tileCounter = 0
  const tiles: Tile[] = []

  // 4 copies of each tile in a standard mahjong set
  for (let copy = 0; copy < 4; copy++) {
    // Number tiles: 9 wan + 9 tong + 9 tiao = 27 per copy × 4 = 108
    for (let i = 0; i < 9; i++) {
      tiles.push(createNumberTile('wan', i + 1, WAN_SYMBOLS[i]))
      tiles.push(createNumberTile('tong', i + 1, TONG_SYMBOLS[i]))
      tiles.push(createNumberTile('tiao', i + 1, TIAO_SYMBOLS[i]))
    }
    // 3 dragons × 4 = 12
    DRAGON_CONFIG.forEach(d => tiles.push(createDragonTile(d.type, d.symbol, d.name)))
    // 4 winds × 4 = 16
    WIND_CONFIG.forEach(w => tiles.push(createWindTile(w.type, w.symbol, w.name)))
  }

  return tiles // 136 tiles total
}

export const SUIT_LABELS: Record<string, string> = {
  wan: 'Wan (萬)',
  tong: 'Tong (筒)',
  tiao: 'Tiao (條)',
  dragon: 'Dragon',
  wind: 'Wind',
}
