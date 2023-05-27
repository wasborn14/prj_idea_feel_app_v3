import React from 'react'
import { WhiteLargeButton } from './Button'
import { Spacer } from '../Spacer'

type Props = {
  onClick: () => void
}

export const GoogleSignInButton = ({ onClick }: Props) => {
  return (
    <WhiteLargeButton onClick={onClick}>
      <img src='/assets/svg/google-icon.svg' alt='google icon' width={18} height={18} />
      <Spacer x={12} />
      Sign in with Google
    </WhiteLargeButton>
  )
}
