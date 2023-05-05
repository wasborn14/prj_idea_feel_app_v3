import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type ProfileState = {
  name: string
  email: string
}

export type ProfilePayloadState = {
  name?: string
  email?: string
}

export type SetProfileData = CaseReducer<ProfileState, PayloadAction<ProfilePayloadState>>
