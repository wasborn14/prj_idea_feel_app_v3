import styled from 'styled-components'
import { ReactNode } from 'react'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import Divider from '@/components/atoms/Divider'
import Link from 'next/link'
import { sp } from '@/media'

interface Props {
  children: ReactNode
}

export const SimpleLayout = ({ children }: Props): JSX.Element => {
  return (
    <Container>
      <HeaderContainer>
        <NavContainer>
          <Logo>Ifee</Logo>
          <NavContentsContainer>
            <NavContentsWrapper>
              <Link href='/auth/login' passHref>
                <NavContents>Login</NavContents>
              </Link>
            </NavContentsWrapper>
            <NavContentsWrapper>
              <Link href='/auth/signUp' passHref>
                <NavContents>SignUp</NavContents>
              </Link>
            </NavContentsWrapper>
          </NavContentsContainer>
        </NavContainer>
        <Divider color={`${Color.DARK_RED2}`} />
      </HeaderContainer>
      {children}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  ${sp`
    width: 100%;
  `}
`

const NavContainer = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  ${sp`
    height: 40px;
  `}
`

const NavContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const NavContentsWrapper = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  :hover {
    background-color: ${Color.GRAY};
  }
`

const Logo = styled.p`
  color: ${Color.BLACK};
  ${fontStyles['32px']}
  ${sp`
    ${fontStyles['28px']}
  `}
`

const NavContents = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['20px']}
  white-space: pre-wrap;
  ${sp`
    ${fontStyles['16px']}
  `}
`
