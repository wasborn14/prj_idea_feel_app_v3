import { Color } from '@/const'
import styled, { CSSObject } from 'styled-components'

type ColorType = 'primary' | 'gray'

const colorByColorType: Record<ColorType, string> = {
  primary: Color.BLUE,
  gray: Color.GRAY_99
}

interface Props {
  color?: ColorType
  outlined?: boolean
  shape?: 'round' | 'square'
  width?: CSSObject['width']
}

export const Clip = styled.span<Props>(({ color = 'primary', outlined = false, shape = 'rounded', width }) => ({
  display: 'inline-block',
  padding: '4px 20px',
  color: outlined ? colorByColorType[color] : 'white',
  backgroundColor: outlined ? 'white' : colorByColorType[color],
  border: `1px solid ${colorByColorType[color]}`,
  borderRadius: shape === 'rounded' ? '16px' : undefined,
  boxSizing: 'border-box',
  textAlign: 'center',
  width
}))
