import React, { forwardRef } from 'react'
import { HiPlus } from 'react-icons/hi'
import { Color } from '@/const'
import styled from 'styled-components'
import { Action, ActionProps } from '../Action'

export const Addition = forwardRef<HTMLButtonElement, ActionProps>((props, ref) => {
  return (
    <Action ref={ref} cursor='pointer' data-cypress='draggable-handle' {...props}>
      <Wrapper>
        <HiPlus size={14} color={`${Color.BLACK}`} />
      </Wrapper>
    </Action>
  )
})

const Wrapper = styled.div`
  margin-top: 2px;
`
