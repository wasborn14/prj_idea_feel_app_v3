import styled from 'styled-components'
import { SelectItem } from './SelectItem'
import { SideProfile } from './SideProfile'

export const SideMainMenu = () => {
  return (
    <Container>
      <SideProfile />
      <SelectItem />
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  height: 100vh;
  overflow-y: scroll;
  /*スクロールバー非表示（Chrome・Safari）*/
  &::-webkit-scrollbar {
    display: none;
  }
`
