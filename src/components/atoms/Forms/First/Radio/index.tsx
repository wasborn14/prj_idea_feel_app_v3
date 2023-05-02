import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { ReactNode, forwardRef } from 'react'
import styled from 'styled-components'

export type RadioProps = {
  id?: string
  name?: string
  value: string
  disabled?: boolean
  text?: ReactNode
  subText?: ReactNode
  checked?: boolean
  fontWeight?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ id, name, value, disabled = false, text, subText, checked, fontWeight, onChange, ...props }: RadioProps, ref) => {
    return (
      <CustomRadioWrapper>
        <CustomRadio
          id={id}
          name={name}
          type='radio'
          value={value}
          disabled={disabled}
          ref={ref}
          checked={checked}
          onChange={onChange}
          {...props}
        />
        <CustomRadioLabelWrapper isDisabled={disabled}>
          {text && <CustomRadioLabel fontWeight={fontWeight}>{text}</CustomRadioLabel>}
          {subText && <CustomRadioSubLabel>{subText}</CustomRadioSubLabel>}
        </CustomRadioLabelWrapper>
      </CustomRadioWrapper>
    )
  }
)

const CustomRadio = styled.input<Pick<RadioProps, 'disabled'>>`
  min-width: 20px;
  min-height: 20px;
  border: 2px solid ${Color.GRAY_CC};
  border-radius: 50%;
  opacity: 1;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    opacity: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${({ disabled }) => (disabled ? Color.GRAY_CC : Color.BLUE)};
    position: absolute;
    top: calc(50% - 6px);
    left: calc(50% - 6px);
  }
  &:checked {
    border-color: ${({ disabled }) => (disabled ? Color.GRAY_CC : Color.BLUE)};
    &::before {
      opacity: 1;
    }
  }
  &:disabled {
    background: ${Color.GRAY_F6};
    cursor: initial;
  }
`

const CustomRadioWrapper = styled.label`
  display: flex;
  align-items: center;
  word-break: break-word;
`

const CustomRadioLabelWrapper = styled.span<{ isDisabled: RadioProps['disabled'] }>`
  display: flex;
  flex-direction: column;
  ${fontStyles['14px']}
  padding-left: 8px;
  cursor: pointer;

  ${({ isDisabled }) =>
    isDisabled &&
    `
    cursor: initial;
  `}
`

const CustomRadioLabel = styled.span<Pick<RadioProps, 'fontWeight'>>`
  font-weight: ${({ fontWeight }) => fontWeight};
`

const CustomRadioSubLabel = styled.span`
  color: ${Color.TRANSPARENT_BLACK_CC};
`
