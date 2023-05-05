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
import { useSignUpMutation } from '@/hooks/api/auth'
import { LoadingCenter } from '@/components/mlecules/Loading'
import { TextAnchor } from '@/components/atoms/Anchors/First/TextAnchor'

export type FormProps = Schema & {}

export const SignUp = () => {
  const router = useRouter()
  // const defaultValues: FormProps = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   re_password: ''
  // }
  const testValues: FormProps = {
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
    defaultValues: testValues,
    resolver: yupResolver(schema)
  })
  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

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
        onSuccess: () => setIsSuccessModalVisible(true),
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
              <ErrorMessage errorMessage={errors.password?.message ?? passwordErrorMessage} />
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
            <GeneralButton type='submit' width={200}>
              SignUp
            </GeneralButton>
            <LinkContainer>
              <Link href='/auth/login' passHref>
                <TextAnchor type='normal' size={18}>
                  Return Login
                </TextAnchor>
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
