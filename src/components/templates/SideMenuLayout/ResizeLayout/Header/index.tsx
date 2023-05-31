import { Color, ZIndex } from '@/const'
import styled from 'styled-components'
import { TabContainer } from './TabContainer'

export const Header = () => {
  return (
    <Container>
      <ContainerColorOverWrite>
        <TabContainer />
      </ContainerColorOverWrite>
    </Container>
  )
}

const Container = styled.div`
  height: 45px;
  width: 100%;
  background-color: ${Color.WHITE};
  position: fixed;
  top: 0;
  z-index: ${ZIndex.Header};
`

const ContainerColorOverWrite = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding-top: 8px;
  align-items: center;
  background-color: ${Color.BACKGROUND_COLOR1};
`
