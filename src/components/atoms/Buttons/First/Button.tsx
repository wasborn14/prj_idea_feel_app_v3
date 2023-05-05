import { Color } from '@/const'
import { pc, sp } from '@/media'
import styled, { css } from 'styled-components'

type ButtonProps = {
  select?: boolean
  current?: boolean
  className?: string
  backgroundColor?: string
  width: number
  height?: 36 | 40 | 48
  disabled?: boolean
}

type AnchorButtonProps = ButtonProps & { onClick?: never }

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

const BaseStyle = css<Pick<ButtonProps, 'width' | 'height'>>`
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  text-decoration: none;
  font-weight: bold;
  svg {
    margin-right: 8px;
  }
`

const PrimaryContainedStyle = css<Pick<ButtonProps, 'current' | 'disabled'>>`
  color: ${Color.WHITE};
  background: ${({ current }) => (current ? Color.DARK_BLUE : Color.BLUE)};
  &:hover {
    background: ${Color.BRIGHT_BLUE};
    color: ${Color.BRIGHT_BLUE};
  }
  ${({ disabled }) => disabled && DisabledStyle}
`

const PrimaryOutlinedStyle = css<Pick<ButtonProps, 'current' | 'disabled'>>`
  color: ${Color.BLUE};
  background: ${({ current }) => (current ? Color.SNOW_WHITE : Color.WHITE)};
  &:hover {
    background: ${Color.BRIGHT_BLUE};
    color: ${Color.BRIGHT_BLUE};
  }
  ${({ disabled }) => disabled && DisabledStyle}
`

// const GeneralStyle = css<Pick<ButtonProps, 'current' | 'disabled'>>`
//   color: ${Color.GRAY_66};
//   background: ${({ current }) => (current ? Color.GRAY_FA : 'transparent')};
//   border: 2px solid ${Color.GRAY_99};
//   ${({ disabled }) => disabled && DisabledStyle};
// `

const GeneralStyle = css<Pick<ButtonProps, 'disabled' | 'select' | 'backgroundColor'>>`
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${sp`
    width: 240px;
    height: 36px;
  `}
  ${pc`
    width: 240px;
    height: 40px;
  `}
  text-decoration: none;
  font-weight: normal;
  svg {
    margin-right: 8px;
  }
  background: ${Color.DARK_BROWN1};
  border: 2px solid ${Color.DARK_BROWN2};
  color: ${Color.WHITE};
  ${({ disabled }) => disabled && DisabledStyle}
`

const OperateStyle = css<Pick<ButtonProps, 'height' | 'disabled'>>`
  color: ${Color.GRAY_66};
  border: 2px solid ${Color.GRAY_99};
  height: ${({ height }) => height || 36}px;
  font-weight: normal;
  ${({ disabled }) => disabled && DisabledStyle};
`

const DestroyOutlinedStyle = css<Pick<ButtonProps, 'disabled'>>`
  background: ${Color.WHITE};
  color: ${Color.ERROR_COLOR};
  border: 2px solid ${Color.ERROR_COLOR};
  &:hover {
    background: ${Color.ERROR_LIGHT_COLOR};
    color: ${Color.ERROR_LIGHT_COLOR};
  }
  ${({ disabled }) => disabled && DisabledStyle};
`

export const ContainedButton = styled.button`
  ${BaseStyle}
  ${PrimaryContainedStyle}
`

export const OutlinedButton = styled.button`
  ${BaseStyle}
  ${PrimaryOutlinedStyle}
`

export const ContainedAnchorButton = styled.a<AnchorButtonProps>`
  ${BaseStyle}
  ${PrimaryContainedStyle}
`

export const OutlinedAnchorButton = styled.a<AnchorButtonProps>`
  ${BaseStyle}
  ${PrimaryOutlinedStyle}
`

export const GeneralButton = styled.button`
  ${BaseStyle}
  ${GeneralStyle}
`

export const OperateButton = styled.button`
  ${BaseStyle}
  ${OperateStyle}
`

export const DestroyOutlinedButton = styled.button`
  ${BaseStyle}
  ${DestroyOutlinedStyle}
`