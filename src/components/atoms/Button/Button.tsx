import React from 'react'

interface ButtonProps {
  backgroundColor?: string

  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button type='button' {...props}>
      {label}
    </button>
  )
}
