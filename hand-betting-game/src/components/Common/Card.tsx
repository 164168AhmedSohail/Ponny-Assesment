import React from 'react'
import { Paper, PaperProps } from '@mui/material'

interface CardProps {
  children: React.ReactNode
  elevation?: number
  className?: string
  sx?: PaperProps['sx']
}

export const Card: React.FC<CardProps> = ({ children, elevation = 2, className, sx }) => {
  return (
    <Paper elevation={elevation} className={className} sx={{ borderRadius: 2, p: 2, ...sx }}>
      {children}
    </Paper>
  )
}
