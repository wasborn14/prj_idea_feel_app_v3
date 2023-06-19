import { Color, ZIndex } from '@/const'
import styled from 'styled-components'
import { TabList } from '../../../../organisms/TabList'
import { useRouter } from 'next/router'
import { fontStyles } from '@/const/font'

export const Header = () => {
  const router = useRouter()
  const isFeel = router.query['category'] === 'feel' ? true : false

  return (
    <Container>
      <ContainerColorOverWrite>{isFeel ? <TitleWrapper>Feel</TitleWrapper> : <TabList />}</ContainerColorOverWrite>
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

const TitleWrapper = styled.div`
  ${fontStyles['24px']}
`
