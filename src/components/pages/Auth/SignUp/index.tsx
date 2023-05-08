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
import { LargeButton } from '@/components/atoms/Buttons/Button'
import { Input } from '@/components/atoms/Forms/Input/Input'
import { ErrorMessage } from '@/components/atoms/Forms/ErrorMessage'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { useSignUpMutation } from '@/hooks/api/auth'
import { LoadingCenter } from '@/components/mlecules/Loading'
import { TextAnchor } from '@/components/atoms/Anchors/TextAnchor'
import {
  CLASS_PREVENT_DOUBLE_CLICK_BUTTON,
  asyncResetDisableButton,
  resetDisableButton
} from '@/components/organisms/Wrapper/PreventDoubleClick'
import { GUIDE_COMPLETED_TEMPORARY_REGISTRATION } from '@/const/guideMessages'

export type FormProps = Schema & {}

export const SignUp = () => {
  const router = useRouter()
  const defaultValues: FormProps = {
    name: '',
    email: '',
    password: '',
    re_password: ''
  }
  const {
    getValues,
    register,
    formState: { errors },
    trigger
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  })
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const isDifferentPasswordMatch = () => {
    return getValues('password') !== getValues('re_password')
  }

  const { mutate: signUpMutate, isLoading } = useSignUpMutation()

  const handleClickSignUp = async (button: HTMLButtonElement) => {
    const validationCheckResult = await trigger()
    if (!validationCheckResult) {
      return asyncResetDisableButton(button)
    }
    if (isDifferentPasswordMatch()) {
      setPasswordErrorMessage(ERROR_AUTH_ENTER_PASSWORD_SAME)
      return asyncResetDisableButton(button)
    }
    signUpMutate(
      { name: getValues('name'), email: getValues('email'), password: getValues('password') },
      {
        onSuccess: () => {
          resetDisableButton(button)
          setIsSuccessModalVisible(true)
        },
        onError: (error: any) => {
          setEmailErrorMessage(error.response.data.email[0])
          resetDisableButton(button)
        }
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
        <SuccessModal onClick={handleClickCloseSuccessModal} description={GUIDE_COMPLETED_TEMPORARY_REGISTRATION} />
      )}
      <Container>
        <MainContents>
          <LoadingCenter isLoading={isLoading} />
          <Title>SignUp</Title>
          <InputWrapper>
            <ErrorMessage errorMessage={errors.name?.message} />
            <Input
              {...register('name')}
              autoComplete='name'
              placeholder='Name'
              error={errors.name?.message !== undefined}
            />
          </InputWrapper>
          <InputWrapper>
            <ErrorMessage errorMessage={errors.email?.message ?? emailErrorMessage} />
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
            <ErrorMessage errorMessage={errors.password?.message} />
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
            <ErrorMessage errorMessage={errors.re_password?.message ?? passwordErrorMessage} />
            <Input
              {...register('re_password', {
                onChange: () => {
                  setPasswordErrorMessage('')
                }
              })}
              autoComplete='current-password'
              placeholder='Confirm Password'
              type='password'
              error={errors.password?.message !== undefined}
            />
          </InputWrapper>
          <Spacer y={32} />
          <LargeButton
            onClick={(e) => {
              handleClickSignUp(e.target as HTMLButtonElement)
            }}
            className={CLASS_PREVENT_DOUBLE_CLICK_BUTTON}
          >
            SignUp
          </LargeButton>
          <LinkContainer>
            <Link href='/auth/login' passHref>
              <TextAnchor type='normal' size={18}>
                Return Login
              </TextAnchor>
            </Link>
          </LinkContainer>
        </MainContents>
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
