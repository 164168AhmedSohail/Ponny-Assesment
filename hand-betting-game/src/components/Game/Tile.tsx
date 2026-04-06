import { memo, KeyboardEvent } from 'react'
import { Box, Tooltip, Typography } from '@mui/material'
import { Tile as TileType } from 'types/tile.types'
import { GAME_CONFIG } from 'constants/config.constants'

interface TileProps {
  tile: TileType
  onClick?: (id: string) => void
  isSmall?: boolean
  highlight?: boolean
}

function getTileColor(tile: TileType): string {
  if (tile.type === 'number') return 'inherit'
  if (tile.value >= GAME_CONFIG.tile.maxValue - 1) return '#e74c3c'
  if (tile.value <= GAME_CONFIG.tile.minValue + 1) return '#3498db'
  return 'inherit'
}

export const Tile = memo(
  ({ tile, onClick, isSmall = false, highlight = false }: TileProps) => {
    const size = isSmall ? 48 : 72
    const fontSize = isSmall ? '1.6rem' : '2.4rem'
    const valueFontSize = isSmall ? '0.6rem' : '0.75rem'
    const valueColor = getTileColor(tile)

    return (
      <Tooltip
        title={`${tile.displayName} — Value: ${tile.value}`}
        placement="top"
        arrow
        disableHoverListener={isSmall}
      >
        <Box
          component={onClick ? 'button' : 'div'}
          onClick={onClick ? () => onClick(tile.id) : undefined}
          role={onClick ? 'button' : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={
            onClick
              ? (e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === 'Enter' || e.key === ' ') onClick(tile.id)
                }
              : undefined
          }
          aria-label={`Tile: ${tile.displayName}, value ${tile.value}`}
          sx={{
            width: size,
            height: size,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 1.5,
            border: highlight
              ? '2px solid var(--color-primary)'
              : '1px solid var(--color-tile-border)',
            bgcolor: 'var(--color-tile-bg)',
            color: 'var(--color-tile-text)',
            cursor: onClick ? 'pointer' : 'default',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
            boxShadow: highlight ? 4 : 1,
            p: 0,
            backgroundImage: 'none',
            '&:hover': onClick
              ? { transform: 'translateY(-3px)', boxShadow: 6 }
              : {},
            '&:focus-visible': {
              outline: '2px solid var(--color-primary)',
              outlineOffset: '2px',
            },
          }}
        >
          <Typography fontSize={fontSize} lineHeight={1}>
            {tile.symbol}
          </Typography>
          <Typography
            fontSize={valueFontSize}
            fontWeight={700}
            sx={{ color: valueColor, mt: 0.25 }}
          >
            {tile.value}
          </Typography>
        </Box>
      </Tooltip>
    )
  },
  (prev, next) =>
    prev.tile.value === next.tile.value &&
    prev.isSmall === next.isSmall &&
    prev.highlight === next.highlight
)

Tile.displayName = 'Tile'
