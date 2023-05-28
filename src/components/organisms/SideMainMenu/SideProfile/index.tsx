import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Item, Menu, Separator, TriggerEvent, useContextMenu } from 'react-contexify'
import { useSelector } from 'react-redux'
import { useIsSp } from '@/hooks/util/useIsSp'
import { pc, sp } from '@/media'
import { profileDataSelector } from '@/store/domain/profile'
import styled from 'styled-components'
import Cookie from 'universal-cookie'
import { useGetUserStatus } from '@/hooks/api/auth'
import { SettingsModal } from '../../SettingsModal'
import { signOut, useSession } from 'next-auth/react'
import { Color } from '@/const'

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
  const { data: session } = useSession()

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
    if (session) {
      signOut({ callbackUrl: '/auth/login' })
    } else {
      router.replace('/auth/login')
    }
  }

  useGetUserStatus()

  return (
    <>
      {isSettingsModalVisible && <SettingsModal onClick={() => setIsSettingsModalVisible(false)} />}
      <UserNameWrapper onClick={(event) => handleContextMenu(event)}>
        <Text>{userProfile.name}</Text>
      </UserNameWrapper>
      <Menu id={PROFILE_MENU_ID}>
        <Item id='settings' onClick={() => setIsSettingsModalVisible(true)}>
          Settings
        </Item>
        <Separator />
        <Item onClick={handleClickLogout}>Logout</Item>
      </Menu>
    </>
  )
}

const UserNameWrapper = styled.div`
  padding: 6px 10px;
  cursor: pointer;
  ${sp`
    padding: 12px 10px;
  `}
  ${pc` 
    &:hover {
      background-color: ${Color.DARK_BROWN3};
    }
  `}
`

const Text = styled.span`
  color: #222;
  padding-left: 0.5rem;
  user-select: none;
`
