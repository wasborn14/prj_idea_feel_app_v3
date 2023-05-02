import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'

type Props = {
  text: string
  isMust?: boolean
  htmlFor?: string
  space?: number
  direction?: 'row' | 'column'
}

export const Label = ({ text, direction = 'row', htmlFor = '', isMust = false, space = 20 }: Props) => {
  return (
    <Container direction={direction}>
      <label htmlFor={htmlFor}>{text}</label>
      {isMust && <MustWrapper marginLeft={direction === 'column' ? 0 : space}>必須</MustWrapper>}
    </Container>
  )
}

const Container = styled.div<{ direction: 'row' | 'column' }>`
  width: 100%;
  display: flex;
  align-items: ${({ direction }) => (direction === 'column' ? 'flex-start' : 'center')};
  color: ${Color.GRAY_33};
  ${fontStyles['16px']}
  font-weight: bold;
  flex-direction: ${({ direction = 'row' }) => direction};
`

const MustWrapper = styled.span<{ marginLeft?: number }>`
  margin-left: ${({ marginLeft }) => marginLeft}px;
  color: ${Color.WHITE};
  background-color: ${Color.ERROR_COLOR};
  ${fontStyles['12px']}
  font-weight: normal;
  padding: 2px 8px;
  border-radius: 12px;
  white-space: nowrap;
`
