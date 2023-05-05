import { useSelector } from 'react-redux'
import Divider from '@/components/atoms/Divider'
import { HamburgerIcon } from '@/components/atoms/Icons/HamburgerIcon'
import { SettingIcon } from '@/components/atoms/Icons/SettingIcon'
import { Color } from '@/const'
import { pageTitleSelector } from '@/store/app/page'
import styled from 'styled-components'

type Props = {
  onMenuClick: () => void
  onSettingsMenuClick: () => void
}

export const Header = ({ onMenuClick, onSettingsMenuClick }: Props) => {
  const pageTitle = useSelector(pageTitleSelector)
  return (
    <Container>
      <ContainerColorOverWrite>
        <ContentsWrapper>
          <IconWrapper onClick={onMenuClick}>
            <HamburgerIcon size={24} />
          </IconWrapper>
          <TitleWrapper>{pageTitle}</TitleWrapper>
          <IconWrapper onClick={onSettingsMenuClick}>
            <SettingIcon size={24} />
          </IconWrapper>
        </ContentsWrapper>
      </ContainerColorOverWrite>
      <Divider color={`${Color.DARK_BROWN1}`} />
    </Container>
  )
}

const Container = styled.div`
  height: 48px;
  width: 100%;
  background-color: ${Color.WHITE};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`

const ContainerColorOverWrite = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  background-color: ${Color.BACKGROUND_COLOR1};
`

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 0 8px 0;
`

const IconWrapper = styled.div``

const TitleWrapper = styled.div`
  margin: 0 16px 0;
`
