import { Color } from '@/const'
import { pc, sp } from '@/media'
import styled, { css } from 'styled-components'

type ButtonProps = {
  select?: boolean
  current?: boolean
  className?: string
  backgroundColor?: string
  color?: string
  width?: number
  height?: 32 | 36 | 40 | 48
  disabled?: boolean
}

const DisabledStyle = css`
  background: ${Color.DISABLE};
  color: ${Color.WHITE};
  border: none;
  &:hover {
    cursor: not-allowed;
    background: ${Color.DISABLE};
    color: ${Color.WHITE};
  }
`

const BaseStyle = css<ButtonProps>`
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  font-weight: normal;
  border: 2px solid ${Color.DARK_BROWN2};
  color: ${Color.WHITE};
  background: ${Color.DARK_BROWN1};
  font-weight: normal;
  &:hover {
    background: ${Color.DARK_BROWN4};
  }
  ${sp`
    width: 160px;
    height: 36px;
  `}
  ${pc`
    width: 200px;
    height: 40px;
  `}
  ${({ disabled }) => disabled && DisabledStyle}
`

const LargeStyle = css<ButtonProps>`
  ${sp`
    width: 200px;
    height: 36px;
  `}
  ${pc`
    width: 240px;
    height: 40px;
  `}
`

const ShortStyle = css<ButtonProps>`
  ${sp`
    width: 140px;
    height: 32px;
  `}
  ${pc`
    width: 160px;
    height: 32px;
  `}
`

const ColorStyle = css<ButtonProps>`
  color: ${({ color }) => `${color}`};
  background: ${({ backgroundColor }) => `${backgroundColor}`};
  &:hover {
    background: ${Color.DARK_BROWN4};
    background: ${({ select }) => (select && select ? Color.DARK_BROWN4 : Color.WHITE)};
  }
`

const SelectStyle = css<ButtonProps>`
  color: ${({ select }) => (select ? Color.WHITE : Color.TEXT_SECOND)};
  background: ${({ select }) => (select ? Color.DARK_BROWN1 : Color.LIGHT_GRAY)};
  &:hover {
    background: ${({ select }) => (select && select ? Color.DARK_BROWN4 : Color.WHITE)};
  }
`

export const NormalButton = styled.button`
  ${BaseStyle}
`

export const ShortButton = styled.button`
  ${BaseStyle}
  ${ShortStyle}
`

export const LargeButton = styled.button`
  ${BaseStyle}
  ${LargeStyle}
`

export const WhiteLargeButton = styled.button`
  ${BaseStyle}
  ${LargeStyle}
  ${ColorStyle}
  border: 2px solid ${Color.GRAY_DD};
  color: ${Color.BLACK};
  background-color: ${Color.WHITE};
`

export const ColorShortButton = styled.button`
  ${BaseStyle}
  ${ShortStyle}
`

export const SelectShortButton = styled.button`
  ${BaseStyle}
  ${ShortStyle}
  ${SelectStyle}
`
