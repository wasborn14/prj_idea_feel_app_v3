import { useRef } from 'react'
import { Spacer } from '@/components/atoms/Spacer'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { BaseModal } from '..'
import { NormalButton } from '@/components/atoms/Buttons/First/Button'

type Props = {
  successMessage?: string
  onClick: () => void
  description?: string
}

export const SuccessModal = ({ successMessage, onClick, description }: Props) => {
  const isInnerClick = useRef(false)

  // モーダル開閉処理関連
  const onInnerClick = () => {
    isInnerClick.current = true
  }
  const onClose = () => {
    // Modalの中をクリックした際は閉じないようにする
    if (!isInnerClick.current) {
      onClick()
    }
    isInnerClick.current = false
  }

  return (
    <BaseModal width={340} color='white' isRadius onClick={onClose} wrapperId='success-modal'>
      <Container onClick={onInnerClick}>
        <TitleContainer>
          <Title>{successMessage ?? 'Success'}</Title>
        </TitleContainer>
        <Spacer y={12} />
        <Description>{description}</Description>
        <Spacer y={24} />
        <NormalButton onClick={onClose}>OK</NormalButton>
      </Container>
    </BaseModal>
  )
}

const Container = styled.div`
  padding: 28px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TitleContainer = styled.div``

const Title = styled.p`
  color: #177b17;
  ${fontStyles['32px']}
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`
