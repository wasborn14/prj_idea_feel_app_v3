import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { Dispatch, SetStateAction } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-slider/assets/index.css'
import { useIsSp } from '@/hooks/util/useIsSp'
import { FormSlider } from '@/components/atoms/Forms/FormSlider'
import { pc, sp } from '@/media'

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
  ${pc`
    margin: 12px 10px 4px 24px;
  `}
`

const DescriptionWrapper = styled.div`
  margin-bottom: 4px;
  ${sp`
    margin-left: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
  `}
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`

const FormSliderWrapper = styled.div<{ isSp: boolean }>`
  margin: 10px 20px 30px;
`
