import { ReactNode } from 'react'
import { Color, ZIndex } from '@/const'
import styled from 'styled-components'
import { ReactPortal } from './ReactPortal'

type OverlayProps = {
  children: ReactNode
  justifyContent: string
  alignItems?: string
  color: 'black' | 'white' | 'transparent'
  zIndex?: number
  wrapperId?: string
  onClick?: () => void
}

export const Overlay = ({
  children,
  justifyContent,
  alignItems,
  color,
  zIndex = ZIndex.Modal,
  wrapperId = 'overlay-portal-wrapper',
  onClick
}: OverlayProps) => {
  return (
    <ReactPortal wrapperId={wrapperId}>
      <Wrapper position={justifyContent} align={alignItems} color={color} zIndex={zIndex} onClick={onClick}>
        {children}
      </Wrapper>
    </ReactPortal>
  )
}

type WrapperProps = {
  position: string
  align?: string
  color: 'black' | 'white' | 'transparent'
  zIndex: number
  onClick?: () => void
}

const Wrapper = styled.div<WrapperProps>`
  z-index: ${({ zIndex }) => zIndex};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: ${({ position }) => position};
  align-items: ${({ align }) => align};
  background-color: ${({ color }) => {
    switch (color) {
      case 'black':
        return `${Color.BLACK}`
      case 'white':
        return `${Color.MODAL_BACK_COLOR}`
      case 'transparent':
        return ''
    }
  }};
`
