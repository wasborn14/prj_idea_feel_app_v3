import React from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { Color } from '@/const'
import { Action, ActionProps } from '../Action'

export function Trash(props: ActionProps) {
  return (
    <Action
      {...props}
      cursor='pointer'
      active={{
        fill: 'rgba(255, 70, 70, 0.95)',
        background: 'rgba(255, 70, 70, 0.1)'
      }}
    >
      <BsTrash3 size={12} color={`${Color.TRANSPARENT_BLACK_99}`} />
    </Action>
  )
}
