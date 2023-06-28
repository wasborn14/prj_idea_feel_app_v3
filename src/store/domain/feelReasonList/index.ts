import * as types from './types'

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

const initialState: types.FeelReasonListState = []

const setFeelReasonListData: types.SetFeelReasonListData = (state, { payload }) => (state = payload)

export const { actions, reducer } = createSlice({
  name: 'domain/feelReasonList',
  initialState,
  reducers: {
    setFeelReasonListData
  }
})

const rootSelector = (state: AllState): types.FeelReasonListState => state.domain.feelReasonList

export const feelReasonListDataSelector = createSelector(rootSelector, (state) => state)
