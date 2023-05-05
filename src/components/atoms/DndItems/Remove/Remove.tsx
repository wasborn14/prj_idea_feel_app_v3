import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { Color } from '@/const'
import { Action, ActionProps } from '../Action'

export function Remove(props: ActionProps) {
  return (
    <Action
      {...props}
      cursor='pointer'
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)'
      }}
    >
      <RxCross1 size={12} color={`${Color.BLACK}`} />
    </Action>
  )
}
