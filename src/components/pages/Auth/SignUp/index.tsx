import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spacer } from '@/components/atoms/Spacer'
import { Color } from '@/const'
import { ERROR_AUTH_ENTER_PASSWORD_SAME } from '@/const/errorMessages'
import { fontStyles } from '@/const/font'
import styled from 'styled-components'
import { Schema, schema } from './schema'
import { sp } from '@/media'
import { Layout } from '@/components/templates/Layout'
import { GeneralButton } from '@/components/atoms/Buttons/First/Button'
import { Input } from '@/components/atoms/Forms/First/Input/Input'
import { ErrorMessage } from '@/components/atoms/Forms/First/ErrorMessage'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { useSignUpMutation } from '@/hooks/api/SignUp'
import { LoadingCenter } from '@/components/mlecules/Loading'

export type FormProps = Schema & {}

export const SignUp = () => {
  const router = useRouter()
  const defaultValues: FormProps = {
    name: 'test',
    email: 'ideafeel.app+2@gmail.com',
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
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const hasFormError = Object.keys(errors).length !== 0

  const isDifferentPasswordMatch = () => {
    return getValues('password') !== getValues('re_password')
  }

  const { mutate: signUpMutate, isLoading } = useSignUpMutation()

  const authUser = () => {
    if (isDifferentPasswordMatch()) {
      setPasswordErrorMessage(ERROR_AUTH_ENTER_PASSWORD_SAME)
      return
    }

    signUpMutate(
      { name: getValues('name'), email: getValues('email'), password: getValues('password') },
      {
        onSuccess: () => console.log('success'),
        onError: (error: any) => setEmailErrorMessage(error.response.data.email[0])
      }
    )
  }

  const handleClickCloseSuccessModal = () => {
    setIsSuccessModalVisible(false)
    router.push({ pathname: '/auth/verifyEmail', query: { email: getValues('email') } })
  }

  return (
    <Layout meta={{ pageTitle: 'Ifee - SignUp' }}>
      {isSuccessModalVisible && (
        <SuccessModal onClick={handleClickCloseSuccessModal} description='仮登録が完了しました。' />
      )}
      <Container>
        <form onSubmit={handleSubmit(authUser)}>
          <MainContents>
            <LoadingCenter loading={isLoading} />
            <Title>SignUp</Title>
            <InputWrapper>
              {hasFormError && (
                <ErrorMessageWrapper>
                  <ErrorMessage message={errors.name?.message} />
                </ErrorMessageWrapper>
              )}
              <Input
                {...register('name')}
                autoComplete='name'
                placeholder='Name'
                error={errors.name?.message !== undefined}
              />
            </InputWrapper>
            <InputWrapper>
              {hasFormError && (
                <ErrorMessageWrapper>
                  <ErrorMessage message={errors.email?.message} />
                </ErrorMessageWrapper>
              )}
              {emailErrorMessage !== '' && (
                <ErrorMessageWrapper>
                  <ErrorMessage message={emailErrorMessage} />
                </ErrorMessageWrapper>
              )}
              <Input
                {...register('email', {
                  onChange: () => {
                    setEmailErrorMessage('')
                  }
                })}
                autoComplete='email'
                placeholder='Email'
                error={errors.email?.message !== undefined}
              />
            </InputWrapper>
            <InputWrapper>
              {hasFormError && (
                <ErrorMessageWrapper>
                  <ErrorMessage message={errors.password?.message} />
                </ErrorMessageWrapper>
              )}
              <Input
                {...register('password', {
                  onChange: () => {
                    setPasswordErrorMessage('')
                  }
                })}
                autoComplete='current-password'
                placeholder='Password'
                type='password'
                error={errors.password?.message !== undefined}
              />
            </InputWrapper>
            <InputWrapper>
              {hasFormError && (
                <ErrorMessageWrapper>
                  <ErrorMessage message={errors.password?.message} />
                </ErrorMessageWrapper>
              )}
              {passwordErrorMessage !== '' && (
                <ErrorMessageWrapper>
                  <ErrorMessage message={passwordErrorMessage} />
                </ErrorMessageWrapper>
              )}
              <Input
                {...register('re_password')}
                autoComplete='current-password'
                placeholder='Confirm Password'
                type='password'
                error={errors.password?.message !== undefined}
              />
            </InputWrapper>
            <Spacer y={32} />
            <GeneralButton type='submit' width={200}>
              SignUp
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

const ErrorMessageWrapper = styled.div`
  margin-bottom: 4px;
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
