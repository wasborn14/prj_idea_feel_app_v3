import * as types from './types'

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialFeelListState = []

const initialState: types.FeelListState = {
  feel_list: [],
  predict_list: []
}

const setFeelListData: types.SetFeelListData = (state, { payload }) => (state = payload)

export const { actions, reducer } = createSlice({
  name: 'domain/feelList',
  initialState,
  reducers: {
    setFeelListData
  }
})

const rootSelector = (state: AllState): types.FeelListState => state.domain.feelList

export const feelListDataSelector = createSelector(rootSelector, (state) => state.feel_list)
export const predictListDataSelector = createSelector(rootSelector, (state) => state.predict_list)
