import { Layout } from '@/components/templates/Layout'
import { Color } from '@/const'
import styled from 'styled-components'
import { fontStyles } from '@/const/font'
import Link from 'next/link'
import { Spacer } from '@/components/atoms/Spacer'
import { sp } from '@/media'
import { LargeButton } from '@/components/atoms/Buttons/Button'
import { GUIDE_COMPLETED_CHANGE_EMAIL, GUIDE_PLEASE_LOGIN_BY_CHANGED_EMAIL } from '@/const/guideMessages'

export const CompleteEmailReset = () => {
  return (
    <Layout meta={{ pageTitle: 'Ifee - CompleteEmailReset' }}>
      <Container>
        <MainContents>
          <Title>{GUIDE_COMPLETED_CHANGE_EMAIL}</Title>
          <Title>{GUIDE_PLEASE_LOGIN_BY_CHANGED_EMAIL}</Title>
          <Spacer y={32} />
          <Link href='/auth/login' passHref>
            <LargeButton>Return Login Page</LargeButton>
          </Link>
        </MainContents>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${sp`
    width: 350px;
  `}
`

const Title = styled.h1`
  ${fontStyles['28px']}
  ${sp`
    ${fontStyles['20px']}
  `}
  color: ${Color.DARK_BROWN2};
`
