import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Item, Menu, Separator, TriggerEvent, useContextMenu } from 'react-contexify'
import { useSelector } from 'react-redux'
import { useIsSp } from '@/hooks/util/useIsSp'
import { sp } from '@/media'
import { profileDataSelector } from '@/store/domain/profile'
import styled from 'styled-components'
import Cookie from 'universal-cookie'
import { useGetUserStatus } from '@/hooks/api/auth'
import { SettingsModal } from '../../SettingsModal'

const cookie = new Cookie()

const PROFILE_MENU_ID = 'profile_menu'

export const SideProfile = () => {
  const isSp = useIsSp()
  const userProfile = useSelector(profileDataSelector)
  const { show } = useContextMenu({
    id: PROFILE_MENU_ID
  })
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false)
  const router = useRouter()

  const handleContextMenu = (event: TriggerEvent) => {
    if (!isSp) {
      show({
        event
      })
    }
  }

  const handleClickLogout = () => {
    const options = { path: '/' }
    cookie.remove('access_token', options)
    router.push('/auth/login')
  }

  useGetUserStatus()

  return (
    <>
      {isSettingsModalVisible && <SettingsModal onClick={() => setIsSettingsModalVisible(false)} />}
      <Wrapper onClick={(event) => handleContextMenu(event)}>
        <Text>{userProfile.name}</Text>
        <Menu id={PROFILE_MENU_ID}>
          <Item id='settings' onClick={() => setIsSettingsModalVisible(true)}>
            Settings
          </Item>
          <Separator />
          <Item onClick={handleClickLogout}>Logout</Item>
        </Menu>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding: 6px 10px;
  ${sp`
    padding: 12px 10px;
  `}
  &:hover {
    background-color: #a0540e13;
  }
`

const Text = styled.span`
  color: #222;
  padding-left: 0.5rem;
  user-select: none;
`
