// components/LoadingSpinner.tsx
import React from 'react'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'border-gray-900' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-b-2',
    lg: 'h-8 w-8 border-b-2'
  }

  return (
    <div 
      className={`animate-spin rounded-full ${sizeClasses[size]} ${color}`}
      aria-label="Loading"
      role="status"
    />
  )
}

export default LoadingSpinner