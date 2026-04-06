import { render, screen } from '@testing-library/react'
import { Tile } from './Tile'
import { Tile as TileType } from 'types/tile.types'

const mockTile: TileType = {
  id: 'test-1',
  type: 'number',
  suit: 'wan',
  value: 5,
  baseValue: 5,
  displayName: '5 wan',
  faceValue: 5,
  symbol: '🀋',
}

describe('Tile', () => {
  it('renders tile symbol', () => {
    render(<Tile tile={mockTile} />)
    expect(screen.getByText('🀋')).toBeInTheDocument()
  })

  it('renders tile value', () => {
    render(<Tile tile={mockTile} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('has correct aria-label', () => {
    render(<Tile tile={mockTile} />)
    expect(
      screen.getByLabelText(/Tile: 5 wan, value 5/i)
    ).toBeInTheDocument()
  })
})
