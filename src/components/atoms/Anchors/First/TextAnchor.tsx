import { Color } from '@/const'
import { pxToRem } from '@/utils/pxToRem'
import styled, { CSSProperties } from 'styled-components'

export type TextAnchorType = 'normal' | 'primary' | 'error'

const styleByType: Record<TextAnchorType, CSSProperties> = {
  normal: {
    color: Color.GRAY_33,
    textDecoration: 'none'
  },
  primary: {
    color: Color.BLUE
  },
  error: {
    color: Color.ERROR_COLOR
  }
}

export const TextAnchor = ({ preventDefaultClickEvent = false, ...props }) => (
  <Anchor
    {...props}
    onClick={(e) => {
      if (props.onClick) {
        if (preventDefaultClickEvent) e.preventDefault()
        props.onClick(e)
      }
    }}
  >
    {props.children}
  </Anchor>
)

const Anchor = styled.a<{
  type?: TextAnchorType
  size?: number
}>(({ type, size }) => ({
  fontSize: size && pxToRem(size),
  textDecoration: 'underline',
  ...styleByType[type ?? 'normal']
}))
