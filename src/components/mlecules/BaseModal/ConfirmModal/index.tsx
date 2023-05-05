import { useRef } from 'react'
import { Spacer } from '@/components/atoms/Spacer'
import { HStack } from '@/components/atoms/Stack/HStack'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { BaseModal } from '..'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'

type Props = {
  description: string
  onApproveClick: () => void
  onCancelClick: () => void
}

export const ConfirmModal = ({ description, onApproveClick, onCancelClick }: Props) => {
  const isInnerClick = useRef(false)

  // モーダル開閉処理関連
  const onInnerClick = () => {
    isInnerClick.current = true
  }
  const handleClickCancelClick = () => {
    // Modalの中をクリックした際は閉じないようにする
    if (!isInnerClick.current) {
      onCancelClick()
    }
    isInnerClick.current = false
  }

  const handleClickApproveClick = () => {
    // Modalの中をクリックした際は閉じないようにする
    if (!isInnerClick.current) {
      onApproveClick()
    }
    isInnerClick.current = false
  }

  return (
    <BaseModal width={580} color='white' isRadius onClick={handleClickCancelClick}>
      <Container onClick={onInnerClick}>
        <Description>{description}</Description>
        <Spacer y={32} />
        <HStack>
          <GeneralButton width={200} onClick={handleClickCancelClick}>
            Cancel
          </GeneralButton>
          <Spacer x={24} />
          <GeneralButton width={200} onClick={handleClickApproveClick}>
            OK
          </GeneralButton>
        </HStack>
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`
