import { RxHamburgerMenu } from 'react-icons/rx' // 最初の2文字でインポートする
import { Color } from '@/const'
import styled from 'styled-components'

type Props = {
  size: 16 | 20 | 22 | 24
  isPlus?: boolean
}

export const HamburgerIcon = ({ size }: Props) => {
  return (
    <Container>
      <RxHamburgerMenu size={size} color={`${Color.BLACK}`} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    background-color: ${Color.TRANSPARENT_BLACK_OTHER_1};
  }
`
