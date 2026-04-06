import { render, screen } from '@testing-library/react'
import { Leaderboard } from './Leaderboard'
import { LeaderboardEntry } from 'types/game.types'

const entries: LeaderboardEntry[] = [
  { id: '1', score: 1000, date: Date.now(), playerName: 'Alice' },
  { id: '2', score: 800, date: Date.now(), playerName: 'Bob' },
]

describe('Leaderboard', () => {
  it('shows empty message when no entries', () => {
    render(<Leaderboard entries={[]} />)
    expect(screen.getByText(/No scores yet/i)).toBeInTheDocument()
  })

  it('renders player names', () => {
    render(<Leaderboard entries={entries} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('renders scores', () => {
    render(<Leaderboard entries={entries} />)
    expect(screen.getByText('1,000')).toBeInTheDocument()
  })
})
