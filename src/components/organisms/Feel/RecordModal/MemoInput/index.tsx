import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled, { css } from 'styled-components'
import { Dispatch, SetStateAction } from 'react'
import { useIsSp } from '@/hooks/util/useIsSp'
import { TextArea } from '@/components/atoms/Forms/TextArea'

type Props = {
  setMemo: Dispatch<SetStateAction<string>>
}

export const MemoInput = ({ setMemo }: Props) => {
  const isSp = useIsSp()

  return (
    <MemoWrapper isSp={isSp}>
      <DescriptionWrapper>
        <Description>Diary</Description>
      </DescriptionWrapper>
      <TextArea
        heightPx={200}
        onChange={(e) => {
          setMemo(e.target.value)
        }}
      />
    </MemoWrapper>
  )
}

const MemoWrapper = styled.div<{ isSp: boolean }>`
  width: 90%;
  margin: 12px 10px 4px 24px;

  ${({ isSp }) =>
    isSp &&
    css`
      width: 100%;
      margin-right: 24px;
    `}
`

const DescriptionWrapper = styled.div`
  margin-left: 4px;
  margin-bottom: 4px;
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`
