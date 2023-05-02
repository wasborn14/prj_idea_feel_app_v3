import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
type Props = {
  message?: string
}

export const ErrorMessage = ({ message }: Props) => {
  return <Text>{message}</Text>
}

const Text = styled.p`
  ${fontStyles['14px']}
  color: ${Color.ERROR_COLOR};
  white-space: pre-line;
`
