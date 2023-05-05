import * as types from './types'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialAuthState = []

const initialState: types.DataState = {
  isLoading: false
}

const setIsLoading: types.SetDataState = (state, { payload }) =>
  (state = {
    isLoading: payload.isLoading
  })

export const { actions, reducer } = createSlice({
  name: 'app/auth',
  initialState,
  reducers: {
    setIsLoading
  }
})

const rootSelector = (state: AllState): types.DataState => state.app.data

export const dataStateSelector = createSelector(rootSelector, (state) => state)
export const isLoadingSelector = createSelector(rootSelector, (state) => state.isLoading)
