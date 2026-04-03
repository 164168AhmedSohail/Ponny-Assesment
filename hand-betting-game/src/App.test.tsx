import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Hand Betting Game', () => {
  render(<App />)
  expect(screen.getByLabelText(/Landing page/i)).toBeInTheDocument()
})
