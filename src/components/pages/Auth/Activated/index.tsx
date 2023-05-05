import { Layout } from '@/components/templates/Layout'
import { Color } from '@/const'
import styled from 'styled-components'
import { fontStyles } from '@/const/font'
import Link from 'next/link'
import { Spacer } from '@/components/atoms/Spacer'
import { sp } from '@/media'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'

export const Activated = () => {
  return (
    <Layout meta={{ pageTitle: 'Ifee - Activated' }}>
      <Container>
        <MainContents>
          <Title>本登録が完了しました。</Title>
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
