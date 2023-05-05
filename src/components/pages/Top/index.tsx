import { Layout } from '@/components/templates/Layout'
import styled from 'styled-components'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { Spacer } from '@/components/atoms/Spacer'
import { SubContents } from './SubContents'
import { SimpleLayout } from '@/components/templates/SimpleLayout'
import Link from 'next/link'
import { sp } from '@/media'
import { useIsSp } from '@/hooks/util/useIsSp'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'

const TITLE_DESCRIPTION =
  '暮らしていく上での考え方や知識を整理し、\n感情の変化を記録・観察していくことで、\n生活をよりよくする行動をしていくためのアプリ'

export const Top = () => {
  const isSp = useIsSp()

  return (
    <Layout meta={{ pageTitle: 'Ifee - Top' }}>
      <SimpleLayout>
        <Spacer y={isSp ? 40 : 72} />
        <TopContentsWrapper>
          <TitleContainer>
            <Title>Ifee</Title>
            <Spacer y={24} />
            <Description>{TITLE_DESCRIPTION}</Description>
            <Spacer y={24} />
            <Link href='/auth/login' passHref>
              <GeneralButton type='submit' width={200}>
                Start
              </GeneralButton>
            </Link>
          </TitleContainer>
          <ImageWrapper>
            <img src='/assets/images/title_image2.png' alt='' width={isSp ? 340 : 500} height={isSp ? 238 : 350} />
          </ImageWrapper>
        </TopContentsWrapper>
        <SubContents />
      </SimpleLayout>
    </Layout>
  )
}

const TopContentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

const TitleContainer = styled.div`
  padding-left: 36px;
`

const Title = styled.h1`
  color: ${Color.BLACK};
  ${fontStyles['42px']}
  ${sp`
    ${fontStyles['36px']}
  `}
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
  ${sp`
    ${fontStyles['12px']}
  `}
  white-space: pre-wrap;
`

const ImageWrapper = styled.div`
  padding: 42px 42px 42px 80px;
  ${sp`
    padding: 42px 10px 42px 20px;
  `}
`