import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { pc } from '@/media'
import styled, { css } from 'styled-components'

export interface InputProps extends InputHTMLAttributes<HTMLElement> {
  disabled?: boolean
  error?: boolean
  height?: number | string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CategoryInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
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
  var inputElement = document.getElementById('category_input') as HTMLInputElement
  if (inputElement) {
    inputElement.select()
  }
  return (
    <Wrapper width={restProps.width} height={height}>
      <InputWrapper
        id='category_input'
        ref={ref}
        className='input-inner'
        disabled={disabled}
        error={error}
        {...restProps}
      />
    </Wrapper>
  )
})

const Wrapper = styled.div<{
  width?: number | string
  height?: number | string
}>`
  display: flex;
  width: ${({ width }) => width ?? '100%'};
  position: relative;
  height: ${({ height }) => height && height};

  .input-inner {
    width: 100%;
    padding: 5px 12px;
    ${pc`
        padding: 3px 12px;
    `}
    ${fontStyles['16px']};
    font-weight: 400;
    color: ${Color.BLACK};
    background-color: transparent;
    background-clip: padding-box;
    border: 1px solid ${Color.DARK_RED1};
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(${Color.BLACK}, 0.075);
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:focus {
      color: ${Color.BLACK};
      background-color: transparent;
      border-color: ${Color.DARK_RED1};
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
