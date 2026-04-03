import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material'

interface ButtonProps {
  onClick: () => void
  disabled?: boolean
  ariaLabel: string
  ariaDescribedBy?: string
  loading?: boolean
  variant?: MuiButtonProps['variant']
  color?: MuiButtonProps['color']
  size?: MuiButtonProps['size']
  fullWidth?: boolean
  startIcon?: React.ReactNode
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  ariaLabel,
  ariaDescribedBy,
  loading = false,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  startIcon,
  children,
}) => {
  return (
    <MuiButton
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : startIcon}
    >
      {children}
    </MuiButton>
  )
}
