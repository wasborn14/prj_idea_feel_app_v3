import { Layout } from '@/components/templates/Layout'
import { Color } from '@/const'
import styled from 'styled-components'
import { fontStyles } from '@/const/font'
import Link from 'next/link'
import { Spacer } from '@/components/atoms/Spacer'
import { sp } from '@/media'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'

export const AlreadyActivated = () => {
  return (
    <Layout meta={{ pageTitle: 'Ifee - AlreadyActivated' }}>
      <Container>
        <MainContents>
          <TitleWrapper>
            <Title>こちらのアカウントは既に本登録が完了しています。</Title>
          </TitleWrapper>
          <Spacer y={32} />
          <Link href='/auth/login' passHref>
            <GeneralButton width={200}>Return Login Page</GeneralButton>
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
  height: 100%;
`

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${sp`
    width: 350px;
  `}
`

const TitleWrapper = styled.div`
  margin-top: 200px;
`

const Title = styled.h1`
  ${fontStyles['28px']}
  color: ${Color.DARK_BROWN2};
`
