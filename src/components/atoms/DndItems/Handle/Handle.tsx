import React, { forwardRef } from 'react'
import { RxDragHandleDots2 } from 'react-icons/rx'
import { Color } from '@/const'
import styled from 'styled-components'
import { Action, ActionProps } from '../Action'

export const Handle = forwardRef<HTMLButtonElement, ActionProps>((props, ref) => {
  return (
    <Action ref={ref} cursor='grab' data-cypress='draggable-handle' {...props}>
      <Wrapper>
        <RxDragHandleDots2 size={14} color={`${Color.BLACK}`} />
      </Wrapper>
    </Action>
  )
})

const Wrapper = styled.div`
  margin-top: 2px;
  opacity: 0.3;
`
