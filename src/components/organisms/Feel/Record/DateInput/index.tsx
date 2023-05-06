import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { Dispatch, SetStateAction } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { FormDatePicker } from '@/components/atoms/Forms/Second/Date'

type Props = {
  baseDate: Date
  setBaseDate: Dispatch<SetStateAction<Date>>
}

export const DateInput = ({ baseDate, setBaseDate }: Props) => {
  return (
    <Container>
      <DescriptionWrapper>
        <Description>Date</Description>
      </DescriptionWrapper>
      <FormDatePicker baseDate={baseDate} setBaseDate={setBaseDate} />
    </Container>
  )
}

const Container = styled.div`
  margin-top: 12px;
  margin-left: 24px;
`

const DescriptionWrapper = styled.div`
  margin-left: 4px;
  margin-bottom: 4px;
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`
