import { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Header } from './Header'
import { SideMenu } from './SideMenu'
import { SettingsMenu } from './SettingsMenu'
import { DeleteIcon } from '@/components/atoms/Icons/DeleteIcon'
import { SettingsSpAccount } from '@/components/templates/SideMenuLayout/SpLayout/SettingsSpNav'

type Props = {
  sideNavContents: ReactNode
  children: ReactNode
}

export const SpLayout = ({ sideNavContents, children }: Props) => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false)

  return (
    <>
      <SideMenu isMenuActive={isMenuActive} onOverLayClick={() => setIsMenuActive(!isMenuActive)}>
        {sideNavContents}
      </SideMenu>
      <SettingsMenu
        isMenuActive={isSettingsMenuActive}
        onOverLayClick={() => setIsSettingsMenuActive(!isSettingsMenuActive)}
      >
        <SettingsMenuHeader onClick={() => setIsSettingsMenuActive(!isSettingsMenuActive)}>
          <DeleteIcon size={24} />
        </SettingsMenuHeader>
        <SettingsSpAccount />
      </SettingsMenu>
      <Header
        onMenuClick={() => setIsMenuActive(!isMenuActive)}
        onSettingsMenuClick={() => setIsSettingsMenuActive(!isSettingsMenuActive)}
      />
      <MainContents>{children}</MainContents>
    </>
  )
}

const SettingsMenuHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 8px;
`

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 52px;
`
