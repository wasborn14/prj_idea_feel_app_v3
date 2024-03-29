import React, { forwardRef, CSSProperties } from 'react'
export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string
    background: string
  }
  cursor?: CSSProperties['cursor']
  onClick?: () => void
}

export const Action = forwardRef<HTMLButtonElement, Props>(({ active, cursor, onClick, style, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          '--fill': active?.fill,
          '--background': active?.background
        } as CSSProperties
      }
      onClick={onClick}
    />
  )
})
