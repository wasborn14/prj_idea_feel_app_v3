import * as types from './types'

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialTabState = []

const initialState: types.TabListState = {
  tabList: []
}

const setTabListData: types.SetTabListData = (state, { payload }) =>
  (state = {
    tabList: payload.tabList ?? state.tabList
  })

export const { actions, reducer } = createSlice({
  name: 'domain/tabList',
  initialState,
  reducers: {
    setTabListData
  }
})

const rootSelector = (state: AllState): types.TabListState => state.domain.tabList

export const tabListDataSelector = createSelector(rootSelector, (state) => state.tabList)
