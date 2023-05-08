import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled, { css } from 'styled-components'
import { Dispatch, SetStateAction } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-slider/assets/index.css'
import { useIsSp } from '@/hooks/util/useIsSp'
import { FormSlider } from '@/components/atoms/Forms/FormSlider'

type Props = {
  sliderValue: number
  setSliderValue: Dispatch<SetStateAction<number>>
}

export const FeelInput = ({ sliderValue, setSliderValue }: Props) => {
  const isSp = useIsSp()

  return (
    <Container>
      <DescriptionWrapper>
        <Description>Feel</Description>
      </DescriptionWrapper>
      <FormSliderWrapper isSp={isSp}>
        <FormSlider sliderValue={sliderValue} onChange={setSliderValue} />
      </FormSliderWrapper>
    </Container>
  )
}

const Container = styled.div`
  margin: 12px 10px 4px 24px;
`

const DescriptionWrapper = styled.div`
  margin-left: 4px;
  margin-bottom: 4px;
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`

const FormSliderWrapper = styled.div<{ isSp: boolean }>`
  margin: 10px 10px 30px;

  ${({ isSp }) =>
    isSp &&
    css`
      margin: 10px 0px 30px;
    `}
`
