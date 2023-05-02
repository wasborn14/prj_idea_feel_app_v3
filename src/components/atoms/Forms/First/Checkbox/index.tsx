import { HStack } from '@/components/atoms/Stack/HStack'
import { Color } from '@/const'
import { useCombinedRefs } from '@/hooks/util/useCombinedRefs'
import { ChangeEvent, FocusEvent, forwardRef, useRef } from 'react'
import styled from 'styled-components'

type Props = {
  name: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: FocusEvent<HTMLInputElement>) => void
  text: string | React.ReactNode
  checked?: boolean
}

export const CheckBox = forwardRef<HTMLInputElement, Props>(({ name, onChange, onBlur, text, checked }, ref) => {
  const el = useRef<HTMLInputElement>(null)

  return (
    <Label>
      <HStack spacing={4}>
        <input
          type='checkbox'
          checked={checked}
          ref={useCombinedRefs(ref, el)}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
        <CheckedCheckWrapper>
          <CheckMark></CheckMark>
        </CheckedCheckWrapper>
        <UncheckedCheckWrapper></UncheckedCheckWrapper>
        {text}
      </HStack>
    </Label>
  )
})

const CheckMark = styled.div`
  width: 11px;
  height: 6px;
  transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
  border-left: 2px solid ${Color.WHITE};
  border-bottom: 2px solid ${Color.WHITE};
`

const CheckWrapper = styled.div`
  margin: 9px;
  min-width: 20px;
  min-height: 20px;
  border-radius: 2px;
`

const CheckedCheckWrapper = styled(CheckWrapper)`
  padding-top: 6px;
  padding-left: 4px;
  background: ${Color.BLUE};
`

const UncheckedCheckWrapper = styled(CheckWrapper)`
  border: 2px solid ${Color.GRAY_CC};
  background-color: ${Color.WHITE};
`

const Label = styled.label`
  word-break: break-word;
  input:checked ~ ${UncheckedCheckWrapper} {
    display: none;
  }
  input:not(:checked) {
    & ~ ${CheckWrapper} {
      display: none;
    }
    & ~ ${UncheckedCheckWrapper} {
      display: none;
    }
  }
`
