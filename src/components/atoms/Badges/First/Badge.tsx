import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled, { css } from 'styled-components'

type BadgeProps = {
  text: number | string
  bgColor: string
  color?: string
  width?: number
  height?: number
  className?: string
}

const BadgeComponent = ({ className, text }: Pick<BadgeProps, 'text' | 'className'>) => (
  <div className={className}>{text}</div>
)

export const Badge = styled(BadgeComponent)<Omit<BadgeProps, 'text' | 'className'>>`
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${fontStyles['12px']}
  ${({ bgColor, color = Color.WHITE, width = 25, height = 22 }) => css`
    width: ${width}px;
    height: ${height}px;
    background-color: ${bgColor};
    color: ${color};
  `}
`
