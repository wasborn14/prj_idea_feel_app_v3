import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Divider from '@/components/atoms/Divider'
import { Spacer } from '@/components/atoms/Spacer'
import { VStack } from '@/components/atoms/Stack/VStack'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { schema, Schema } from './schema'
import { useIsSp } from '@/hooks/util/useIsSp'
import { BaseModal } from '@/components/mlecules/BaseModal'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { ErrorMessage } from '@/components/atoms/Forms/First/ErrorMessage'
import { Input } from '@/components/atoms/Forms/First/Input/Input'
import { NormalButton } from '@/components/atoms/Buttons/First/Button'
import { useUpdatePassword } from '@/hooks/api/auth'
import { LoadingCenter } from '@/components/mlecules/Loading'

type Props = {
  onClick: () => void
}

export type FormProps = Schema & {}

export const ChangePasswordModal = ({ onClick }: Props) => {
  const isSp = useIsSp()
  const [changePasswordError, setChangePasswordError] = useState('')
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const isInnerClick = useRef(false)
  const defaultValues: FormProps = {
    current_password: '',
    new_password: '',
    re_new_password: ''
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

  const { mutate: updatePasswordMutate, isLoading } = useUpdatePassword()
  const handleClickChangePassword = () => {
    updatePasswordMutate(
      {
        current_password: getValues('current_password'),
        new_password: getValues('new_password'),
        re_new_password: getValues('re_new_password')
      },
      {
        onSuccess: () => setIsSuccessModalVisible(true),
        onError: (err: any) => {
          const errorMessage = err.data.tip
          if (errorMessage) {
            setChangePasswordError(errorMessage)
          }
        }
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
    <BaseModal width={isSp ? 350 : 400} color='white' isRadius onClick={onClose} wrapperId='change-password-modal'>
      {isSuccessModalVisible && (
        <SuccessModal onClick={handleClickCloseSuccessModal} description='Your Password Changed' />
      )}
      <LoadingCenter isLoading={isLoading} />
      <form onSubmit={handleSubmit(handleClickChangePassword)}>
        <Container onClick={onInnerClick}>
          <TitleContainer>
            <Title>Change Password</Title>
          </TitleContainer>
          <Divider color={`${Color.DARK_RED2}`} />
          <MenuContainer>
            <VStack>
              <Spacer y={24} />
              <Description>Setting New Password</Description>
              <ErrorMessage errorMessage={errors.current_password?.message ?? changePasswordError} />
              <InputWrapper>
                <Input
                  {...register('current_password', {
                    onChange: () => setChangePasswordError('')
                  })}
                  autoComplete='password'
                  placeholder='Old Password'
                  type='password'
                  error={errors.current_password?.message !== undefined}
                />
              </InputWrapper>
              <ErrorMessage errorMessage={errors.new_password?.message} />
              <InputWrapper>
                <Input
                  {...register('new_password', {
                    onChange: () => setChangePasswordError('')
                  })}
                  autoComplete='password'
                  placeholder='New Password'
                  type='password'
                  error={errors.new_password?.message !== undefined}
                />
              </InputWrapper>
              <ErrorMessage errorMessage={errors.re_new_password?.message} />
              <InputWrapper>
                <Input
                  {...register('re_new_password', {
                    onChange: () => setChangePasswordError('')
                  })}
                  autoComplete='password'
                  placeholder='Confirm Password'
                  type='password'
                  error={errors.re_new_password?.message !== undefined}
                />
              </InputWrapper>
              <ButtonWrapper>
                <NormalButton type='submit'>Change Password</NormalButton>
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
  flex-direction: row;
  justify-content: center;
  margin: 0px 16px;
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
