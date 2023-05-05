import { FiEdit } from 'react-icons/fi' // 最初の2文字でインポートする
import { Color } from '@/const'
import styled from 'styled-components'

const EditIcon = () => {
  return (
    <Container>
      <FiEdit size={16} color={`${Color.DARK_RED1}`} />
    </Container>
  )
}

export default EditIcon

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
