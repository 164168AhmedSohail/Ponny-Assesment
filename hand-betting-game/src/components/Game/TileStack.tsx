import React from 'react'
import { Box } from '@mui/material'
import { Tile as TileType } from 'types/tile.types'
import { Tile } from './Tile'

interface TileStackProps {
  tiles: TileType[]
  isSmall?: boolean
  label?: string
}

export const TileStack: React.FC<TileStackProps> = ({ tiles, isSmall = false, label }) => {
  return (
    <Box
      role="group"
      aria-label={label ?? 'Tile hand'}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: isSmall ? 0.5 : 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {tiles.map(tile => (
        <Tile key={tile.id} tile={tile} isSmall={isSmall} />
      ))}
    </Box>
  )
}
