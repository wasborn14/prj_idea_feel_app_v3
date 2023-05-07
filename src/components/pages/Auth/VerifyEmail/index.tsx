import { Layout } from '@/components/templates/Layout'
import { Color } from '@/const'
import styled from 'styled-components'
import { fontStyles } from '@/const/font'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Spacer } from '@/components/atoms/Spacer'
import { sp } from '@/media'
import { LargeButton } from '@/components/atoms/Buttons/First/Button'
import { SuccessModal } from '@/components/mlecules/BaseModal/SuccessModal'
import { useResendActivation } from '@/hooks/api/auth'
import { LoadingCenter } from '@/components/mlecules/Loading'
import {
  GUIDE_COMPLETED_SEND_EMAIL_FOR_ACTIVATE,
  GUIDE_EMAIL_VERIFY_REQUIRED,
  GUIDE_PLEASE_ACTIVATE_FROM_ADDRESS_ATTACHED_EMAIL
} from '@/const/guideMessages'

export const VerifyEmail = () => {
  const [isResendVerifyEmail, setIsResendVerifyEmail] = useState(false)
  const router = useRouter()
  const temporaryEmail = typeof router.query.email === 'string' ? router.query.email : ''
  const { mutate: resendActivationMutate, isLoading } = useResendActivation()

  const sendEmail = () => {
    resendActivationMutate(
      {
        email: temporaryEmail
      },
      {
        onSuccess: () => setIsResendVerifyEmail(true),
        onError: () => console.error('resend email failed')
      }
    )
  }

  return (
    <Layout meta={{ pageTitle: 'Ifee - VerifyEmail' }}>
      {isResendVerifyEmail && (
        <SuccessModal
          onClick={() => setIsResendVerifyEmail(false)}
          description={GUIDE_COMPLETED_SEND_EMAIL_FOR_ACTIVATE}
        />
      )}
      <Container>
        <LoadingCenter isLoading={isLoading} />
        <MainContents>
          <Title>{GUIDE_EMAIL_VERIFY_REQUIRED}</Title>
          <Spacer y={8} />
          <Description>{GUIDE_PLEASE_ACTIVATE_FROM_ADDRESS_ATTACHED_EMAIL}</Description>
          <Spacer y={32} />
          <LargeButton onClick={sendEmail}>Resend Email</LargeButton>
          <Spacer y={32} />
          <Link href='/auth/signUp'>
            <LargeButton>Return SignUp</LargeButton>
          </Link>
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
  ${fontStyles['28px']}
  ${sp`
    ${fontStyles['20px']}
  `}
  color: ${Color.DARK_BROWN2};
  text-align: center;
`

const Description = styled.h1`
  ${fontStyles['18px']}
  ${sp`
    ${fontStyles['12px']}
  `}
  color: ${Color.DARK_BROWN2};
  text-align: center;
`
