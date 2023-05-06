import { Layout } from '@/components/templates/Layout'
import { Color } from '@/const'
import styled from 'styled-components'
import { fontStyles } from '@/const/font'
import Link from 'next/link'
import { Spacer } from '@/components/atoms/Spacer'
import { sp } from '@/media'
import { LargeButton } from '@/components/atoms/Buttons/First/Button'

export const Error = () => {
  return (
    <Layout meta={{ pageTitle: 'Ifee - Error' }}>
      <Container>
        <MainContents>
          <Title>エラーが発生しました。</Title>
          <Spacer y={8} />
          <Description>申し訳ございませんが再度ログインしてください。</Description>
          <Spacer y={32} />
          <Link href='/auth/login'>
            <LargeButton>Return Login</LargeButton>
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
  text-align: center;
`

const Description = styled.h1`
  ${fontStyles['18px']}
  ${sp`
    ${fontStyles['12px']}
  `}
  color: ${Color.DARK_BROWN2};
  text-align: center;
`
