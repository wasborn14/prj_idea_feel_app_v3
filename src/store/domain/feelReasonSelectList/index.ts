import * as types from './types'

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialFeelListState = []

const initialState: types.FeelReasonSelectListState = {
  options: []
}

const setFeelReasonSelectListData: types.SetFeelReasonSelectListData = (state, { payload }) => (state = payload)

export const { actions, reducer } = createSlice({
  name: 'domain/feelReasonSelectList',
  initialState,
  reducers: {
    setFeelReasonSelectListData
  }
})

const rootSelector = (state: AllState): types.FeelReasonSelectListState => state.domain.feelReasonSelectList

export const feelReasonSelectListDataSelector = createSelector(rootSelector, (state) => state.options)
