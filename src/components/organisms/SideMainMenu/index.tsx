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
  // TODO:　position:fixedではなく、スクロール禁止にする
  position: fixed;
`
