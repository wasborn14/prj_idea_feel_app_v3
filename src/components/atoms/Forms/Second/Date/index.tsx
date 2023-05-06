import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled, { css } from 'styled-components'
import DatePicker, { registerLocale } from 'react-datepicker'
import ja from 'date-fns/locale/ja'
import 'react-datepicker/dist/react-datepicker.css'
import { useIsSp } from '@/hooks/util/useIsSp'
import { Dispatch, SetStateAction } from 'react'
registerLocale('ja', ja)

type Props = {
  baseDate: Date
  setBaseDate: Dispatch<SetStateAction<Date>>
}

export const FormDatePicker = ({ baseDate, setBaseDate }: Props) => {
  const isSp = useIsSp()

  return (
    <Container isSp={isSp}>
      <DatePicker
        selected={baseDate}
        onChange={(selectedDate) => setBaseDate(selectedDate || baseDate)}
        locale='ja'
        onFocus={(e) => e.target.blur()}
      />
    </Container>
  )
}

const Container = styled.div<{ isSp: boolean }>`
  input {
    width: 100%;
    min-width: 120px;
    padding: 5px 12px;
    ${fontStyles['16px']};
    color: ${Color.BLACK};
    font-weight: 400;
    background-color: ${Color.WHITE};
    background-clip: padding-box;
    border: 1px solid ${Color.WHITE};
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(${Color.BLACK}, 0.075);
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:focus {
      color: ${Color.BLACK};
      background-color: ${Color.WHITE};
      border-color: ${Color.BLUE};
      outline: 0;
      box-shadow: 0 0 0 3 rgba(${Color.BLUE}, 0.25);
    }

    &:disabled,
    &[readonly] {
      background-color: ${Color.LIGHT_GRAY3};
      border-color: none;
      opacity: 1;
    }
  }
  .react-datepicker {
    border: 2px solid ${Color.DARK_BROWN1};
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(${Color.BLACK}, 0.075);
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  .react-datepicker__triangle {
    // TODO: 吹き出しにもカラーを当てたいが当てられていない
    &::after {
      border-color: black;
      border-bottom-color: black;
    }
  }
  .react-datepicker__header {
    background-color: ${Color.LIGHT_BROWN};
  }
  .react-datepicker__month {
    background-color: ${Color.BACKGROUND_COLOR1};
    margin: 0px;
  }
  .react-datepicker__month-container {
    width: 420px;
    ${({ isSp }) =>
      isSp &&
      css`
        width: 350px;
      `}
  }
  .react-datepicker__current-month {
    ${fontStyles['24px']}
    margin-top: 8px;
    margin-bottom: 8px;
  }
  .react-datepicker__navigation {
    top: 10px;
    height: 48px;
    width: 48px;
  }
  .react-datepicker__navigation-icon::before {
    height: 16px;
    width: 16px;
    border-color: ${Color.DARK_BROWN1};
  }
  .react-datepicker__day-names {
  }
  .react-datepicker__day-name {
    ${fontStyles['20px']}
    margin-left: 10px;
    margin-right: 10px;
    width: 3rem;
  }
  .react-datepicker__day {
    ${fontStyles['20px']}
    margin: 14px 10px;
    width: 3rem;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: ${Color.DARK_BROWN1};
  }
`
