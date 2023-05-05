import { ReactNode } from 'react'
import { Overlay } from '@/components/atoms/Overlay'
import { Color, ZIndex } from '@/const'
import styled, { css } from 'styled-components'

type BaseModalProps = {
  children: ReactNode
  width: number
  color: 'black' | 'white'
  isRadius?: boolean
  zIndex?: number
  onClick?: () => void
}

export const BaseModal = ({
  children,
  width,
  color,
  isRadius = false,
  zIndex = ZIndex.Modal,
  onClick
}: BaseModalProps) => {
  return (
    <Overlay justifyContent='center' alignItems='center' color={color} zIndex={zIndex} onClick={onClick}>
      <Wrapper width={width} isRadius={isRadius}>
        <Inner>{children}</Inner>
      </Wrapper>
    </Overlay>
  )
}

type WrapperProps = {
  width: number
  isRadius: boolean
}

const Wrapper = styled.section<WrapperProps>`
  width: ${({ width }) => width}px;
  background-color: ${Color.WHITE};
  ${({ isRadius }) =>
    isRadius
      ? css`
          border-radius: 8px;
        `
      : css`
          border-radius: 0px;
        `}
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`

const Inner = styled.section`
  background-color: ${Color.BACKGROUND_COLOR1};
`
