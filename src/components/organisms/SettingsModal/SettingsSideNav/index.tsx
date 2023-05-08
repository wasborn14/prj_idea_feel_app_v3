import { useSelector } from 'react-redux'
import Divider from '@/components/atoms/Divider'
import EditIcon from '@/components/atoms/Icons/EditIcon'
import { GearIcon } from '@/components/atoms/Icons/GearIcon'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { profileDataSelector } from '@/store/domain/profile'
import styled from 'styled-components'

type Props = {
  onAccountClick: () => void
  onNotificationClick: () => void
  onLanguageClick: () => void
}

export const SettingsSideNav = ({ onAccountClick, onNotificationClick, onLanguageClick }: Props) => {
  const userProfile = useSelector(profileDataSelector)

  return (
    <>
      <ProfileContainer>
        <Email>{userProfile.email}</Email>
      </ProfileContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <MenuContainer onClick={onAccountClick}>
        <GearIcon />
        <MenuTitle>Account</MenuTitle>
      </MenuContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <MenuContainer onClick={onNotificationClick}>
        <EditIcon />
        <MenuTitle>Notification</MenuTitle>
      </MenuContainer>
      <DividerWrapper>
        <Divider color={`${Color.DARK_RED2}`} />
      </DividerWrapper>
      <MenuContainer onClick={onLanguageClick}>
        <EditIcon />
        <MenuTitle>Language</MenuTitle>
      </MenuContainer>
    </>
  )
}

const DividerWrapper = styled.div`
  margin-left: 16px;
  margin-right: 16px;
`

const ProfileContainer = styled.div`
  width: auto;
  padding: 8px 8px 8px 4px;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 4px 16px 4px;
  :hover {
    background-color: ${Color.GRAY};
  }
`

const Email = styled.p`
  margin-left: 8px;
  overflow-wrap: break-word;
  user-select: none;
  ${fontStyles['18px']}
`

const MenuTitle = styled.div`
  margin-left: 8px;
  user-select: none;
  ${fontStyles['18px']}
`
