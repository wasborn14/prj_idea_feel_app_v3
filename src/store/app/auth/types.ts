import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type AuthState = {
  temporaryEmail: string // 仮登録のemail
}

export type SetAuthState = CaseReducer<AuthState, PayloadAction<AuthState>>
