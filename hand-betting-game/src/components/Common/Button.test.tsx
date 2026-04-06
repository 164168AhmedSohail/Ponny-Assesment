import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button onClick={jest.fn()} ariaLabel="test">Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handler = jest.fn()
    render(<Button onClick={handler} ariaLabel="test">Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button onClick={jest.fn()} ariaLabel="test" disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('has correct aria-label', () => {
    render(<Button onClick={jest.fn()} ariaLabel="my label">Click</Button>)
    expect(screen.getByRole('button', { name: 'my label' })).toBeInTheDocument()
  })
})
