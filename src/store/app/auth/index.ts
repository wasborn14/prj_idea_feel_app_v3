import * as types from './types'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialAuthState = []

const initialState: types.AuthState = {
  temporaryEmail: ''
}

const setAuthTemporaryEmail: types.SetAuthState = (state, { payload }) =>
  (state = {
    temporaryEmail: payload.temporaryEmail
  })

export const { actions, reducer } = createSlice({
  name: 'app/auth',
  initialState,
  reducers: {
    setAuthTemporaryEmail
  }
})

const rootSelector = (state: AllState): types.AuthState => state.app.auth

export const authStateSelector = createSelector(rootSelector, (state) => state)
export const authTemporaryEmailSelector = createSelector(rootSelector, (state) => state.temporaryEmail)
