import { Color } from '@/const'
import styled, { css } from 'styled-components'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import 'rc-slider/assets/index.css'
import { Option } from 'react-dropdown'
import 'react-dropdown/style.css'
import { DateInput } from './DateInput'
import { FeelInput } from './FeelInput'
import { ReasonSelect } from './ReasonSelect'
import { MemoInput } from './MemoInput'
import { useIsSp } from '@/hooks/util/useIsSp'
import { ColorShortButton } from '@/components/atoms/Buttons/Button'
import { useGetFeelGraphData, usePostFeel } from '@/hooks/api/feel'
import { BaseModal } from '@/components/mlecules/BaseModal'
import { Spacer } from '@/components/atoms/Spacer'
import { pc } from '@/media'
import { DeleteIcon } from '@/components/atoms/Icons/DeleteIcon'

const DEFAULT_SLIDER_VALUE = 50

const DEFAULT_OPTION: Option = {
  value: '0',
  label: 'select reason ...'
}

type Props = {
  baseDate: Date
  setBaseDate: Dispatch<SetStateAction<Date>>
  isSelectWeek: boolean
  onClick: () => void
}

export const RecordModal = ({ baseDate, setBaseDate, isSelectWeek, onClick }: Props) => {
  const isSp = useIsSp()
  const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDER_VALUE)
  const [selectReason, setSelectReason] = useState(DEFAULT_OPTION)
  const [memo, setMemo] = useState('')
  const { refetch } = useGetFeelGraphData(baseDate, isSelectWeek)
  const isInnerClick = useRef(false)

  const convertFeelValue = (value: number): number => {
    switch (value) {
      case 0:
        return 1
      case 25:
        return 2
      case 50:
        return 3
      case 75:
        return 4
      case 100:
        return 5
      default:
        return 0
    }
  }

  const { mutate: postFeelMutate } = usePostFeel()
  const createFeel = (isPredict: boolean) => {
    const startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 0, 0, 0)
    const endDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), 23, 59, 59)

    postFeelMutate(
      {
        date: baseDate.toISOString(),
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        value: convertFeelValue(sliderValue),
        reason: Number(selectReason.value),
        memo: memo,
        is_predict: isPredict
      },
      {
        onSuccess: () => {
          refetch()
          onClick()
        },
        onError: (err: any) => console.error({ err })
      }
    )
  }

  // モーダル開閉処理関連
  const onInnerClick = () => {
    isInnerClick.current = true
  }
  const onClose = () => {
    // Modalの中をクリックした際は閉じないようにする
    if (!isInnerClick.current) {
      onClick()
    }
    isInnerClick.current = false
  }

  return (
    <BaseModal
      width={isSp ? 340 : 650}
      color='white'
      onClick={isSp ? () => {} : onClose}
      wrapperId='success-modal'
      isRadius
    >
      <Container onClick={onInnerClick}>
        <DeleteIconWrapper onClick={onClose}>
          <DeleteIcon size={16} />
        </DeleteIconWrapper>
        <FunctionsContainer isSp={isSp}>
          <DateInput baseDate={baseDate} setBaseDate={setBaseDate} />
          <Spacer x={12} />
          <ReasonSelect selectReason={selectReason} setSelectReason={setSelectReason} />
        </FunctionsContainer>
        <Spacer y={12} />
        <FeelInput sliderValue={sliderValue} setSliderValue={setSliderValue} />
        <Spacer y={24} />
        <MemoInput setMemo={setMemo} onInnerClick={onInnerClick} />
        <Spacer y={12} />
        <SubmitButtonContainer isSp={isSp}>
          <ButtonWrapper>
            <ColorShortButton
              width={isSp ? 140 : 200}
              height={36}
              color={`${Color.BLACK}`}
              backgroundColor={`${Color.PREDICT_COLOR}`}
              type='submit'
              onClick={() => createFeel(true)}
            >
              Will
            </ColorShortButton>
          </ButtonWrapper>
          <Spacer x={isSp ? 12 : 24} />
          <ButtonWrapper>
            <ColorShortButton
              width={isSp ? 140 : 200}
              height={36}
              color={`${Color.BLACK}`}
              backgroundColor={`${Color.RECORD_COLOR}`}
              type='submit'
              onClick={() => createFeel(false)}
            >
              Record
            </ColorShortButton>
          </ButtonWrapper>
        </SubmitButtonContainer>
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`

const DeleteIconWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
`

const FunctionsContainer = styled.div<{ isSp: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ isSp }) =>
    isSp &&
    css`
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    `}
`

const SubmitButtonContainer = styled.div<{ isSp: boolean }>`
  display: flex;
  flex-direction: row;
  margin-left: 32px;

  ${({ isSp }) =>
    isSp &&
    css`
      margin-left: 4px;
      justify-content: center;
      align-items: center;
    `}
`

const ButtonWrapper = styled.div`
  ${pc`
    margin: 8px;
  `}
`
