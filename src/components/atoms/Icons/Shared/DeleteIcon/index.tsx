import { ImCross } from 'react-icons/im' // 最初の2文字でインポートする
import { Color } from '@/const'
import styled from 'styled-components'

type Props = {
  size: 12 | 16 | 20 | 22 | 24 | 28 | 32 | 36 | 42
}

export const DeleteIcon = ({ size }: Props) => {
  return (
    <IconWrapper>
      <ImCross size={size} color={`${Color.DARK_RED1}`} />
    </IconWrapper>
  )
}

const IconWrapper = styled.div`
  cursor: pointer;
`
