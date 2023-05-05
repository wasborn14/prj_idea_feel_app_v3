import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Layout } from '@/components/templates/Layout'
import { Color } from '@/const'
import { ERROR_AUTH_ENTER_PASSWORD_SAME } from '@/const/errorMessages'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { Schema, schema } from './schema'
import { sp } from '@/media'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { ErrorMessage } from '@/components/atoms/Forms/First/ErrorMessage'
import { Input } from '@/components/atoms/Forms/First/Input/Input'
import { Spacer } from '@/components/atoms/Spacer'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'
import { useResetPassword } from '@/hooks/api/auth'
import { LoadingCenter } from '@/components/mlecules/Loading'

export type FormProps = Schema & {}

export const ResetPassword = () => {
  const router = useRouter()
  const { email, token } = router.query
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const defaultValues: FormProps = {
    password: 'password',
    re_password: 'password'
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

  const isDifferentPasswordMatch = () => {
    return getValues('password') !== getValues('re_password')
  }

  const { mutate: resetPasswordMutate, isLoading } = useResetPassword()

  const authUser = () => {
    if (isDifferentPasswordMatch()) {
      setPasswordErrorMessage(ERROR_AUTH_ENTER_PASSWORD_SAME)
      return
    }
    if (typeof email !== 'string' || typeof token !== 'string') {
      return
    }
    resetPasswordMutate(
      { email, token, password: getValues('password'), password_confirmation: getValues('re_password') },
      {
        onSuccess: () => {
          setIsSuccessModalVisible(true)
        },
        onError: (error: any) => {
          const errorMessage = error.response.data
          if (errorMessage.new_password) {
            const convertedPasswordErrorMessage = errorMessage.new_password.join('\n')
            setPasswordErrorMessage(convertedPasswordErrorMessage)
          }
        }
      }
    )
  }

  const handleClickCloseSuccessModal = () => {
    router.push('/auth/login')
  }

  return (
    <Layout meta={{ pageTitle: 'Ifee - New Password' }}>
      {isSuccessModalVisible && (
        <SuccessModal onClick={handleClickCloseSuccessModal} description='Your Password Changed' />
      )}
      <LoadingCenter isLoading={isLoading} />
      <Container>
        <form onSubmit={handleSubmit(authUser)}>
          <MainContents>
            <Title>New Password</Title>
            <InputWrapper>
              <ErrorMessage errorMessage={errors.password?.message ?? passwordErrorMessage} />
              <Input
                {...register('password', {
                  onChange: () => {
                    setPasswordErrorMessage('')
                  }
                })}
                autoComplete='current-password'
                placeholder='password'
                type='password'
                error={errors.password?.message !== undefined}
              />
            </InputWrapper>
            <InputWrapper>
              <ErrorMessage errorMessage={errors.password?.message} />
              <Input
                {...register('re_password')}
                autoComplete='current-password'
                placeholder='confirm password'
                type='password'
                error={errors.password?.message !== undefined}
              />
            </InputWrapper>
            <Spacer y={32} />
            <GeneralButton type='submit' width={200}>
              Reset Password
            </GeneralButton>
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
  height: 100%;
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
