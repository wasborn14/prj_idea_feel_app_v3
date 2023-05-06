import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Divider from '@/components/atoms/Divider'
import { VStack } from '@/components/atoms/Stack/VStack'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { profileDataSelector } from '@/store/domain/profile'
import styled from 'styled-components'
import Cookie from 'universal-cookie'
import { ChangeEmailModal } from '../../../../organisms/SettingsModal/SettingsAccount/ChangeEmailModal'
import { ChangeNameModal } from '../../../../organisms/SettingsModal/SettingsAccount/ChangeNameModal'
import { ChangePasswordModal } from '../../../../organisms/SettingsModal/SettingsAccount/ChangePasswordModal'
import { NormalButton } from '@/components/atoms/Buttons/First/Button'
import { Spacer } from '@/components/atoms/Spacer'

const cookie = new Cookie()

export const SettingsSpAccount = () => {
  const userProfile = useSelector(profileDataSelector)
  const router = useRouter()
  const [isChangeEmailModalVisible, setIsChangeEmailModalVisible] = useState(false)
  const [isChangeNameModalVisible, setIsChangeNameModalVisible] = useState(false)
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false)

  const openEmailModal = () => {
    setIsChangeEmailModalVisible(true)
  }
  const closeEmailModal = () => {
    setIsChangeEmailModalVisible(false)
  }
  const openNameModal = () => {
    setIsChangeNameModalVisible(true)
  }
  const closeNameModal = () => {
    setIsChangeNameModalVisible(false)
  }
  const openPasswordModal = () => {
    setIsChangePasswordModalVisible(true)
  }
  const closePasswordModal = () => {
    setIsChangePasswordModalVisible(false)
  }

  const handleClickLogout = () => {
    const options = { path: '/' }
    cookie.remove('access_token', options)
    router.push('/auth/login')
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Account</Title>
        <Description>Change to account settings</Description>
      </TitleContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <MenuContainer>
        <VStack spacing={12}>
          <SubTitle>Email</SubTitle>
          <Context>{userProfile.email}</Context>
          <NormalButton onClick={openEmailModal}>Change Email</NormalButton>
        </VStack>
      </MenuContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <MenuContainer>
        <VStack spacing={12}>
          <SubTitle>Name</SubTitle>
          <Context>{userProfile.name}</Context>
          <NormalButton onClick={openNameModal}>Change Name</NormalButton>
        </VStack>
      </MenuContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <MenuContainer>
        <VStack spacing={12}>
          <SubTitle>Password</SubTitle>
          <NormalButton onClick={openPasswordModal}>Change Password</NormalButton>
        </VStack>
      </MenuContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <Spacer y={24} />
      <TitleContainer>
        <Title>Logout</Title>
        <LogoutButtonWrapper>
          <NormalButton onClick={handleClickLogout}>Logout</NormalButton>
        </LogoutButtonWrapper>
      </TitleContainer>
      {isChangeEmailModalVisible && <ChangeEmailModal onClick={closeEmailModal} />}
      {isChangeNameModalVisible && <ChangeNameModal onClick={closeNameModal} />}
      {isChangePasswordModalVisible && <ChangePasswordModal onClick={closePasswordModal} />}
    </Container>
  )
}

const Container = styled.div`
  margin: 16px 56px 32px;
`

const DividerWrapper = styled.div`
  margin: 16px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  margin: 16px;
`

const Title = styled.p`
  ${fontStyles['24px']}
`

const SubTitle = styled.p`
  ${fontStyles['20px']}
`

const Context = styled.p`
  ${fontStyles['16px']}
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`

const LogoutButtonWrapper = styled.div`
  padding: 16px;
`
