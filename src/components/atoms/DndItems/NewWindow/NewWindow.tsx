import React from 'react'
import { TfiNewWindow } from 'react-icons/tfi'
import { Color } from '@/const'
import { Action, ActionProps } from '../Action'

export function NewWindow(props: ActionProps) {
  return (
    <Action
      {...props}
      cursor='pointer'
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)'
      }}
    >
      <TfiNewWindow size={12} color={`${Color.BLACK}`} />
    </Action>
  )
}
