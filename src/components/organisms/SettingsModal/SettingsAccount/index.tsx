import { useState } from 'react'
import { useSelector } from 'react-redux'
import Divider from '@/components/atoms/Divider'
import { HStack } from '@/components/atoms/Stack/HStack'
import { VStack } from '@/components/atoms/Stack/VStack'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { profileDataSelector } from '@/store/domain/profile'
import styled from 'styled-components'
import { ChangeEmailModal } from './ChangeEmailModal'
import { ChangeNameModal } from './ChangeNameModal'
import { ChangePasswordModal } from './ChangePasswordModal'
import { ShortButton } from '@/components/atoms/Buttons/First/Button'

export const SettingsAccount = () => {
  const userProfile = useSelector(profileDataSelector)
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
          <HStack spacing={32}>
            <Context>{userProfile.email}</Context>
            <ShortButton onClick={openEmailModal}>Change Email</ShortButton>
          </HStack>
        </VStack>
      </MenuContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <MenuContainer>
        <VStack spacing={12}>
          <SubTitle>Name</SubTitle>
          <HStack spacing={32}>
            <Context>{userProfile.name}</Context>
            <ShortButton onClick={openNameModal}>Change Name</ShortButton>
          </HStack>
        </VStack>
      </MenuContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <MenuContainer>
        <VStack spacing={12}>
          <SubTitle>Password</SubTitle>
          <HStack spacing={32}>
            <ShortButton onClick={openPasswordModal}>Change Password</ShortButton>
          </HStack>
        </VStack>
      </MenuContainer>
      {isChangeEmailModalVisible && <ChangeEmailModal onClick={closeEmailModal} />}
      {isChangeNameModalVisible && <ChangeNameModal onClick={closeNameModal} />}
      {isChangePasswordModalVisible && <ChangePasswordModal onClick={closePasswordModal} />}
    </Container>
  )
}

const Container = styled.div`
  margin: 16px 16px 32px;
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
