import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Divider from '@/components/atoms/Divider'
import { VStack } from '@/components/atoms/Stack/VStack'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { useIsSp } from '@/hooks/util/useIsSp'
import styled from 'styled-components'
import { schema, Schema } from './schema'
import { BaseModal } from '@/components/mlecules/BaseModal'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { ErrorMessage } from '@/components/atoms/Forms/First/ErrorMessage'
import { Input } from '@/components/atoms/Forms/First/Input/Input'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'
import { useSendChangeEmailUrl } from '@/hooks/api/auth'
import { LoadingCenter } from '@/components/mlecules/Loading'

type Props = {
  onClick: () => void
}

export type FormProps = Schema & {}

export const ChangeEmailModal = ({ onClick }: Props) => {
  const isSp = useIsSp()
  const [changeEmailError, setChangeEmailError] = useState('')
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const isInnerClick = useRef(false)
  const defaultValues: FormProps = {
    new_email: ''
  }

  const {
    getValues,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })

  const { mutate: sendChangeEmailUrlMutate, isLoading } = useSendChangeEmailUrl()
  const handleClickChangeEmail = () => {
    sendChangeEmailUrlMutate(
      { new_email: getValues('new_email') },
      {
        onSuccess: () => setIsSuccessModalVisible(true),
        onError: () => setChangeEmailError('Failed send change email url')
      }
    )
  }

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

  const handleClickCloseSuccessModal = () => {
    setIsSuccessModalVisible(false)
    onClick()
  }

  return (
    <BaseModal width={isSp ? 350 : 400} color='white' isRadius onClick={onClose} wrapperId='change-email-modal'>
      {isSuccessModalVisible && (
        <SuccessModal onClick={handleClickCloseSuccessModal} description='Email変更用のURLを送信しました。' />
      )}
      <LoadingCenter isLoading={isLoading} />
      <form onSubmit={handleSubmit(handleClickChangeEmail)}>
        <Container onClick={onInnerClick}>
          <TitleContainer>
            <Title>Change Email</Title>
          </TitleContainer>
          <Divider color={`${Color.DARK_RED2}`} />
          <MenuContainer>
            <VStack>
              <Description>Setting New Email</Description>
              <ErrorMessage errorMessage={errors.new_email?.message ?? changeEmailError} />
              <InputWrapper>
                <Input
                  {...register('new_email', {
                    onChange: () => setChangeEmailError('')
                  })}
                  autoComplete='email'
                  placeholder='New Email'
                  type='email'
                  error={errors.new_email?.message !== undefined}
                />
              </InputWrapper>
              <ButtonWrapper>
                <GeneralButton width={280} height={40} type='submit'>
                  Change Email
                </GeneralButton>
              </ButtonWrapper>
            </VStack>
          </MenuContainer>
        </Container>
      </form>
    </BaseModal>
  )
}

const Container = styled.div`
  padding: 16px 16px 32px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 16px;
`

const Title = styled.p`
  ${fontStyles['24px']}
`

const Description = styled.p`
  color: ${Color.LIGHT_GRAY2};
  ${fontStyles['16px']}
`

const InputWrapper = styled.div`
  width: 300px;
`
const ButtonWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  justify-content: center;
`
