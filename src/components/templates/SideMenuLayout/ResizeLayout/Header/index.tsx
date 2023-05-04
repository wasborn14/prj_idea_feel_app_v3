import { useSelector } from 'react-redux'
// import { HamburgerIcon } from "@/components/atoms/Icons/HamburgerIcon";
import { SettingIcon } from '@/components/atoms/Icons/SettingIcon'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { pageTitleSelector } from '@/store/app/page'
import styled from 'styled-components'

type Props = {
  onClick: () => void
}

export const Header = ({ onClick }: Props) => {
  const pageTitle = useSelector(pageTitleSelector)

  return (
    <Container>
      <ContainerColorOverWrite>
        <ContentsWrapper>
          {/* <IconWrapper onClick={onClick}>
            <HamburgerIcon size={24} />
          </IconWrapper> */}
          <TitleWrapper>{pageTitle}</TitleWrapper>
          <IconWrapper onClick={onClick}>
            <SettingIcon size={24} />
          </IconWrapper>
        </ContentsWrapper>
      </ContainerColorOverWrite>
    </Container>
  )
}

const Container = styled.div`
  height: 45px;
  width: 100%;
  background-color: ${Color.WHITE};
  position: fixed;
  top: 0;
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
  ${fontStyles['24px']}
`
