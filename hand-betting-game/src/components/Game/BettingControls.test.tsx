import { render, screen, fireEvent } from '@testing-library/react'
import { BettingControls } from './BettingControls'

describe('BettingControls', () => {
  it('renders Bet Higher and Bet Lower buttons', () => {
    render(
      <BettingControls onBet={jest.fn()} isAnimating={false} currentHandValue={15} />
    )
    expect(screen.getByText('Bet Higher')).toBeInTheDocument()
    expect(screen.getByText('Bet Lower')).toBeInTheDocument()
  })

  it('disables buttons during animation', () => {
    render(
      <BettingControls onBet={jest.fn()} isAnimating={true} currentHandValue={15} />
    )
    expect(screen.getByRole('button', { name: /Bet that the next hand will be higher/i })).toBeDisabled()
    expect(screen.getByRole('button', { name: /Bet that the next hand will be lower/i })).toBeDisabled()
  })

  it('calls onBet with "higher" when Bet Higher is clicked', () => {
    const mockOnBet = jest.fn()
    render(
      <BettingControls onBet={mockOnBet} isAnimating={false} currentHandValue={15} />
    )
    fireEvent.click(screen.getByRole('button', { name: /Bet that the next hand will be higher/i }))
    expect(mockOnBet).toHaveBeenCalledWith('higher')
  })

  it('calls onBet with "lower" when Bet Lower is clicked', () => {
    const mockOnBet = jest.fn()
    render(
      <BettingControls onBet={mockOnBet} isAnimating={false} currentHandValue={15} />
    )
    fireEvent.click(screen.getByRole('button', { name: /Bet that the next hand will be lower/i }))
    expect(mockOnBet).toHaveBeenCalledWith('lower')
  })
})
