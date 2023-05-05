import { Color } from '@/const'
import { pxToRem } from '@/utils/pxToRem'
import styled, { CSSProperties } from 'styled-components'

export type TextAnchorType = 'normal' | 'primary' | 'red' | 'error'

const styleByType: Record<TextAnchorType, CSSProperties> = {
  normal: {
    color: Color.LIGHT_GRAY2,
    textDecoration: 'none'
  },
  primary: {
    color: Color.BLUE
  },
  red: {
    color: Color.DARK_RED1,
    textDecoration: 'none'
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

const Anchor = styled.div<{
  type?: TextAnchorType
  size?: number
}>(({ type, size }) => ({
  fontSize: size && pxToRem(size),
  textDecoration: 'underline',
  ...styleByType[type ?? 'normal']
}))
