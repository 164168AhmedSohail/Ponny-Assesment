export type TileType = 'number' | 'dragon' | 'wind'
export type TileSuit = 'wan' | 'tong' | 'tiao' | 'dragon' | 'wind'
export type DragonType = 'red' | 'green' | 'white'
export type WindType = 'east' | 'south' | 'west' | 'north'
export type BetType = 'higher' | 'lower'

export interface Tile {
  id: string
  type: TileType
  suit: TileSuit
  value: number
  baseValue: number
  displayName: string
  faceValue?: number
  dragonType?: DragonType
  windType?: WindType
  symbol: string
}
