import { useRef } from 'react'
import { Spacer } from '@/components/atoms/Spacer'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { BaseModal } from '..'
import { NormalButton } from '@/components/atoms/Buttons/First/Button'
import { useIsSp } from '@/hooks/util/useIsSp'
import { sp } from '@/media'

type Props = {
  description: string
  onApproveClick: () => void
  onCancelClick: () => void
}

export const ConfirmModal = ({ description, onApproveClick, onCancelClick }: Props) => {
  const isInnerClick = useRef(false)
  const isSp = useIsSp()

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
    <BaseModal
      width={isSp ? 350 : 580}
      color='white'
      isRadius
      onClick={handleClickCancelClick}
      wrapperId='confirm-modal'
    >
      <Container onClick={onInnerClick}>
        <Description>{description}</Description>
        <Spacer y={32} />
        {isSp ? (
          <ButtonWrapper>
            <NormalButton onClick={handleClickApproveClick}>OK</NormalButton>
            <Spacer y={12} />
            <NormalButton onClick={handleClickCancelClick}>Cancel</NormalButton>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <NormalButton onClick={handleClickCancelClick}>Cancel</NormalButton>
            <Spacer x={24} />
            <NormalButton onClick={handleClickApproveClick}>OK</NormalButton>
          </ButtonWrapper>
        )}
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${sp`
    flex-direction:column;
  `}
`
