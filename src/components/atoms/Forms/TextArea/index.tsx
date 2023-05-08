import { ChangeEvent, forwardRef, InputHTMLAttributes } from 'react'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled, { css } from 'styled-components'

export interface InputProps extends InputHTMLAttributes<HTMLElement> {
  error?: boolean
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  widthPx?: number
  heightPx: number
}

type Styles = Pick<InputProps, 'widthPx' | 'heightPx'>

export const TextArea = forwardRef<HTMLTextAreaElement, InputProps>((props, ref) => {
  const { error, ...restProps } = props
  return (
    <Wrapper widthPx={props.widthPx} heightPx={props.heightPx}>
      <TextAreaWrapper ref={ref} className='input-inner' error={error} {...restProps} />
    </Wrapper>
  )
})

const Wrapper = styled.div<Styles>`
  width: 100%;
  .input-inner {
    width: 100%;
    /* width: ${(props) => props.widthPx}px; */
    height: ${(props) => props.heightPx}px;
    ${fontStyles['16px']};
    font-weight: 400;
    padding: 4px 8px;
    color: ${Color.BLACK};
    background-color: ${Color.WHITE};
    background-clip: padding-box;
    border: 1px solid ${Color.GRAY_CC};
    resize: none;
    border-radius: 4px;
    box-shadow: inset 0 1px 2px rgba(${Color.BLACK}, 0.075);
    transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }

  &:focus {
    color: ${Color.BLACK};
    background-color: ${Color.WHITE};
    border-color: ${Color.BLUE};
    outline: 0;
    box-shadow: 0 0 0 3 rgba(${(Color.BLUE, 0.25)});
  }
  &:disabled,
  &[readonly] {
    background-color: ${Color.LIGHT_GRAY3};
    border-color: none;
    opacity: 1;
  }
`

const TextAreaWrapper = styled.textarea<Pick<InputProps, 'error'>>`
  ${({ error }) =>
    error &&
    css`
      border: 2px solid ${Color.ERROR_COLOR} !important;
    `}
`
