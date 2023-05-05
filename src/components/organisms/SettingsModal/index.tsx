import { useRef, useState } from 'react'
import { Color } from '@/const'
import styled from 'styled-components'
import { SettingsAccount } from './SettingsAccount'
import { SettingsDemo } from './SettingsDemo'
import { SettingsSideNav } from './SettingsSideNav'
import { BaseModal } from '@/components/mlecules/BaseModal'

type Props = {
  onClick: () => void
}

type navType = 'account' | 'notification' | 'language'

export const SettingsModal = ({ onClick }: Props) => {
  const [selectedNav, setSelectedNav] = useState<navType>('account')
  const isInnerClick = useRef(false)

  const onInnerClick = () => {
    isInnerClick.current = true
  }

  const onClose = () => {
    // Modalの中をクリックした際は閉じないようにする
    if (!isInnerClick.current) {
      onClick()
    }
    isInnerClick.current = false
  }

  const Settings = () => {
    switch (selectedNav) {
      case 'account':
        return <SettingsAccount />
      case 'notification':
      case 'language':
        return <SettingsDemo />
    }
  }

  return (
    <BaseModal width={930} color='white' isRadius onClick={onClose}>
      <ContentsWrapper onClick={onInnerClick}>
        <SideContainer>
          <SettingsSideNav
            onAccountClick={() => setSelectedNav('account')}
            onNotificationClick={() => setSelectedNav('notification')}
            onLanguageClick={() => setSelectedNav('language')}
          />
        </SideContainer>
        <MainContainer>
          <Settings />
        </MainContainer>
      </ContentsWrapper>
    </BaseModal>
  )
}

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const SideContainer = styled.div`
  background-color: ${Color.OVERLAP_BROWN_COLOR};
  max-width: 250px;
  min-height: 414px;
`

export const MainContainer = styled.div`
  width: 100%;
`
