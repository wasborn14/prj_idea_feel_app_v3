import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

export interface InputProps extends InputHTMLAttributes<HTMLElement> {
  disabled?: boolean
  error?: boolean
  height?: number | string
  paddingHorizontal?: number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, error, height, ...restProps } = props
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if ('value' in props) {
    delete restProps.defaultValue
    restProps.value = fixControlledValue(props.value)
  }
  return (
    <Wrapper width={restProps.width} height={height} paddingHorizontal={restProps.paddingHorizontal}>
      <InputWrapper ref={ref} className='input-inner' disabled={disabled} error={error} {...restProps} />
    </Wrapper>
  )
})

const Wrapper = styled.div<{
  width?: number | string
  height?: number | string
  paddingHorizontal?: number
}>`
  display: flex;
  width: ${({ width }) => width ?? '100%'};
  position: relative;
  height: ${({ height }) => height && height};

  .input-inner {
    width: 100%;
    ${({ paddingHorizontal }) =>
      paddingHorizontal
        ? css`
            padding: 5px ${paddingHorizontal}px;
          `
        : css`
            padding: 5px 18px;
          `}
    ${fontStyles['16px']};
    font-weight: 400;
    color: ${Color.BLACK};
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

    &::placeholder {
      color: rgba(0, 0, 0, 0.4);
      opacity: 1;
    }

    &:disabled,
    &[readonly] {
      background-color: ${Color.LIGHT_GRAY3};
      border-color: none;
      opacity: 1;
    }
  }
`

const InputWrapper = styled.input<Pick<InputProps, 'error'>>`
  ${({ error }) =>
    error &&
    css`
      border: 2px solid ${Color.ERROR_COLOR} !important;
    `}
`
