import * as types from './types'

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialFeelGraphState = []

const initialState: types.FeelGraphState = {
  record_list: [],
  predict_list: []
}

const setFeelGraphData: types.SetFeelGraphData = (state, { payload }) => (state = payload)

export const { actions, reducer } = createSlice({
  name: 'domain/feelGraph',
  initialState,
  reducers: {
    setFeelGraphData
  }
})

const rootSelector = (state: AllState): types.FeelGraphState => state.domain.feelGraph

export const recordListDataSelector = createSelector(rootSelector, (state) => state.record_list)
export const predictListDataSelector = createSelector(rootSelector, (state) => state.predict_list)
