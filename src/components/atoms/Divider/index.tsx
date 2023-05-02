import { Color } from '@/const'
import styled, { css } from 'styled-components'

interface Props {
  direction?: 'vertical' | 'horizontal'
  color?: string
  dashed?: boolean
  height?: number
  width?: number
}

export default styled.hr<Props>`
  margin: 0;
  color: ${({ color }) => color ?? 'black'};
  border-style: ${({ dashed }) => dashed && 'dashed'};
  ${({ direction = 'horizontal' }) => {
    switch (direction) {
      case 'horizontal':
        return css`
          border-top: 1px solid ${Color.GRAY_CC};
        `
      case 'vertical':
        return css`
          border-right: 1px solid ${Color.GRAY_CC};
        `
    }
  }}
  ${({ height }) =>
    height !== undefined &&
    css`
      height: ${height}px;
    `}
    ${({ width }) =>
    width !== undefined &&
    css`
      width: ${width}px;
    `}
`
