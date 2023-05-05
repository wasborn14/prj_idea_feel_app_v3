import * as types from './types'

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

const initialState: types.ProfileState = {
  name: '',
  email: ''
}

const setProfileData: types.SetProfileData = (state, { payload }) =>
  (state = {
    name: payload.name ?? state.name,
    email: payload.email ?? state.email
  })

const setUserNameData: types.SetProfileData = (state, { payload }) =>
  (state = {
    name: payload.name ?? state.name,
    email: state.email
  })

const setUserEmailData: types.SetProfileData = (state, { payload }) =>
  (state = {
    name: state.name,
    email: payload.email ?? state.email
  })

export const { actions, reducer } = createSlice({
  name: 'domain/profile',
  initialState,
  reducers: {
    setProfileData,
    setUserNameData,
    setUserEmailData
  }
})

const rootSelector = (state: AllState): types.ProfileState => state.domain.profile

export const profileDataSelector = createSelector(rootSelector, (state) => state)
