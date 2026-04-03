import { Component, ErrorInfo, ReactNode } from 'react'
import { storageService } from 'services/storage.service'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class GameErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Game crashed:', error, errorInfo)
    storageService.backupGameState()
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined })
    window.location.reload()
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            role="alert"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              gap: '1rem',
              padding: '2rem',
              textAlign: 'center',
              fontFamily: 'sans-serif',
            }}
          >
            <h2>Something went wrong</h2>
            <p style={{ color: '#666', maxWidth: 400 }}>{this.state.error?.message}</p>
            <button
              onClick={this.handleReset}
              aria-label="Reset game and reload page"
              style={{
                padding: '0.75rem 2rem',
                background: '#2c3e50',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Reset Game
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
