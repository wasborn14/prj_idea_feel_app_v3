import { FiSettings } from 'react-icons/fi' // 最初の2文字でインポートする
import { Color } from '@/const'
import styled from 'styled-components'

export const GearIcon = () => {
  return (
    <Container>
      <FiSettings size={16} color={`${Color.DARK_RED1}`} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
