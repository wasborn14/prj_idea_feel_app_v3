import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'

export const SettingsDemo = () => {
  return (
    <Container>
      <TitleContainer>
        <Title>Demo</Title>
        <Description>This page is developing</Description>
      </TitleContainer>
    </Container>
  )
}

const Container = styled.div`
  margin: 16px 16px 32px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  ${fontStyles['24px']}
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`
