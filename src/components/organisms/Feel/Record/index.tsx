import { Color } from '@/const'
import styled, { css } from 'styled-components'
import { Dispatch, SetStateAction, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-slider/assets/index.css'
import { Option } from 'react-dropdown'
import 'react-dropdown/style.css'
import { DateInput } from './DateInput'
import { FeelInput } from './FeelInput'
import { ReasonSelect } from './ReasonSelect'
import { MemoInput } from './MemoInput'
import { useIsSp } from '@/hooks/util/useIsSp'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'
import { useGetFeelList, usePostFeel } from '@/hooks/api/feel'

const DEFAULT_SLIDER_VALUE = 50

const DEFAULT_OPTION: Option = {
  value: '0',
  label: 'select reason ...'
}

type Props = {
  baseDate: Date
  setBaseDate: Dispatch<SetStateAction<Date>>
  isSelectWeek: boolean
}

export const Record = ({ baseDate, setBaseDate, isSelectWeek }: Props) => {
  const isSp = useIsSp()
  const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDER_VALUE)
  const [selectReason, setSelectReason] = useState(DEFAULT_OPTION)
  const [memo, setMemo] = useState('')
  const { refetch } = useGetFeelList(baseDate, isSelectWeek)

  const convertFeelValue = (feel: number): number => {
    switch (feel) {
      case 0:
        return -5
      case 10:
        return -4
      case 20:
        return -3
      case 30:
        return -2
      case 40:
        return -1
      case 50:
        return 0
      case 60:
        return 1
      case 70:
        return 2
      case 80:
        return 3
      case 90:
        return 4
      case 100:
        return 5
    }
    return 0
  }

  const { mutate: postFeelMutate } = usePostFeel()
  const createFeel = (isPredict: boolean) => {
    // const getFeelList = () => {
    //   const dates = getStartAndEndDate(baseDate, isSelectWeek)
    //   fetchFeelList(dates.startDate, dates.endDate)
    //     .then((res) => {
    //       dispatch(feelListActions.setFeelListData(res.data))
    //     })
    //     .catch((err) => {
    //       console.error(err.message)
    //     })
    // }

    const startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 0, 0, 0)
    const endDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 23, 59, 59)

    postFeelMutate(
      {
        date: baseDate.toISOString(),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        feel: convertFeelValue(sliderValue),
        reason: Number(selectReason.value),
        memo: memo,
        is_predict: isPredict
      },
      {
        onSuccess: () => refetch(),
        onError: (err: any) => console.error({ err })
      }
    )
    // postFeel(
    //   baseDate.toISOString(),
    //   startDate.toISOString(),
    //   endDate.toISOString(),
    //   convertFeelValue(sliderValue),
    //   Number(selectReason.value),
    //   memo,
    //   isPredict
    // )
    //   .then(() => {
    //     // getFeelList()
    //     refetch()
    //   })
    //   .catch(() => {
    //     console.error('保存失敗')
    //   })
  }

  return (
    <Container>
      <RecordContainer>
        <RecordFunctionsContainer isSp={isSp}>
          <DateInput baseDate={baseDate} setBaseDate={setBaseDate} />
          <FeelInput sliderValue={sliderValue} setSliderValue={setSliderValue} />
          <ReasonSelect selectReason={selectReason} setSelectReason={setSelectReason} />
          <MemoInput setMemo={setMemo} />
        </RecordFunctionsContainer>
        <SubmitButtonContainer isSp={isSp}>
          <ButtonWrapper>
            <GeneralButton
              width={isSp ? 160 : 200}
              height={36}
              color={`${Color.BLACK}`}
              type='submit'
              onClick={() => createFeel(true)}
            >
              Predict
            </GeneralButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <GeneralButton
              width={isSp ? 160 : 200}
              height={36}
              color={`${Color.BLACK}`}
              type='submit'
              onClick={() => createFeel(false)}
            >
              Record
            </GeneralButton>
          </ButtonWrapper>
        </SubmitButtonContainer>
      </RecordContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const RecordFunctionsContainer = styled.div<{ isSp: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 70%;

  ${({ isSp }) =>
    isSp &&
    css`
      width: 100%;
    `}
`

const RecordContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const SubmitButtonContainer = styled.div<{ isSp: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: 32px;

  ${({ isSp }) =>
    isSp &&
    css`
      margin-left: 16px;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    `}
`

const ButtonWrapper = styled.div`
  margin: 8px;
`
