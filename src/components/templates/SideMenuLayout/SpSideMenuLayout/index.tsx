import { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { SideMenu } from './SideMenu'

type Props = {
  sideNavContents: ReactNode
  children: ReactNode
}

export const SpSideMenuLayout = ({ sideNavContents, children }: Props) => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false)

  return (
    <>
      <SideMenu isMenuActive={isMenuActive} onOverLayClick={() => setIsMenuActive(!isMenuActive)}>
        {sideNavContents}
      </SideMenu>
      <Header
        onMenuClick={() => setIsMenuActive(!isMenuActive)}
        onSettingsMenuClick={() => setIsSettingsMenuActive(!isSettingsMenuActive)}
      />
      <MainContents>{children}</MainContents>
    </>
  )
}

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 52px;
`
