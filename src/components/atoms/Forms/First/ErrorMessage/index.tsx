import { Spacer } from '@/components/atoms/Spacer'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
type Props = {
  errorMessage?: string
}

export const ErrorMessage = ({ errorMessage }: Props) => {
  return (
    <>
      {errorMessage && errorMessage !== '' ? (
        <Wrapper>
          <Text>{errorMessage}</Text>
        </Wrapper>
      ) : (
        <Spacer y={28} />
      )}
    </>
  )
}

const Text = styled.p`
  ${fontStyles['14px']}
  color: ${Color.ERROR_COLOR};
  white-space: pre-line;
`

const Wrapper = styled.div`
  margin: 4px;
  margin-left: 8px;
`
