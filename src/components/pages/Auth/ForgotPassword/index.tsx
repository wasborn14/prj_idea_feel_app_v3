import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Layout } from '@/components/templates/Layout'
import { Color } from '@/const'
import styled from 'styled-components'
import { schema, Schema } from './schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { fontStyles } from '@/const/font'
import { useState } from 'react'
import { Spacer } from '@/components/atoms/Spacer'
import { sp } from '@/media'
import { Input } from '@/components/atoms/Forms/Input/Input'
import { LargeButton } from '@/components/atoms/Buttons/Button'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { ErrorMessage } from '@/components/atoms/Forms/ErrorMessage'
import { useResetPasswordRequest } from '@/hooks/api/auth'
import { LoadingCenter } from '@/components/mlecules/Loading'
import { GUIDE_SENT_YOU_EMAIL_FOR_RESET_PASSWORD } from '@/const/guideMessages'

export type FormProps = Schema & {}

export const ForgotPassword = () => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const defaultValues: FormProps = {
    email: 'ideafeel.app@gmail.com'
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

  const { mutate: resendPasswordRequestMutate, isLoading } = useResetPasswordRequest()

  const sendResetPasswordEmail = () => {
    resendPasswordRequestMutate(
      {
        email: getValues('email')
      },
      {
        onSuccess: () => setIsSuccessModalVisible(true),
        onError: () => console.error('resend failed')
      }
    )
  }

  const handleClickCloseSuccessModal = () => {
    setIsSuccessModalVisible(false)
  }

  return (
    <Layout meta={{ pageTitle: 'Ifee - Forgot Password' }}>
      {isSuccessModalVisible && (
        <SuccessModal
          successMessage='Email Send'
          onClick={handleClickCloseSuccessModal}
          description={GUIDE_SENT_YOU_EMAIL_FOR_RESET_PASSWORD}
        />
      )}
      <LoadingCenter isLoading={isLoading} />
      <Container>
        <form onSubmit={handleSubmit(sendResetPasswordEmail)}>
          <MainContents>
            <Title>Reset Password</Title>
            <InputWrapper>
              <ErrorMessage errorMessage={errors.email?.message} />
              <Input
                {...register('email')}
                autoComplete='email'
                placeholder='Email'
                error={errors.email?.message !== undefined}
              />
            </InputWrapper>
            <Spacer y={32} />
            <LargeButton type='submit'>Send</LargeButton>
            <LinkContainer>
              <Link href='/auth/login' passHref>
                <Text>Return Login</Text>
              </Link>
            </LinkContainer>
          </MainContents>
        </form>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${sp`
    width: 350px;
  `}
`
const Title = styled.h1`
  ${fontStyles['42px']}
  color: ${Color.DARK_BROWN2};
`

const InputWrapper = styled.div`
  margin-top: 24px;
  width: 320px;
  ${sp`
    width: 280px;
  `}
`

const LinkContainer = styled.div`
  margin-top: 16px;
  margin-left: 200px;
  ${sp`
    margin-left: 160px;
  `}
`

const Text = styled.p`
  ${fontStyles['18px']}
  color: ${Color.LIGHT_GRAY2};
  cursor: pointer;
`
