import { AiOutlineDown } from 'react-icons/ai' // 最初の2文字でインポートする
import { Color } from '@/const'
import styled from 'styled-components'

type Props = {
  size: 16 | 20 | 22 | 24
}

export const DownArrowIcon = ({ size }: Props) => {
  return (
    <Container>
      <AiOutlineDown size={size} color={`${Color.BLACK}`} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
