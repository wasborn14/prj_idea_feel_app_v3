import * as types from './types'

import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialIdeaState = []

const initialState: types.IdeaListState = {
  ideaList: {},
  ideaContainers: []
}

const setIdeaListData: types.SetIdeaListData = (state, { payload }) =>
  (state = {
    ideaList: payload.ideaList ?? state.ideaList,
    ideaContainers: state.ideaContainers
  })

const setIdeaContainersData: types.SetIdeaListData = (state, { payload }) =>
  (state = {
    ideaList: state.ideaList,
    ideaContainers: payload.ideaContainers ?? state.ideaContainers
  })

export const { actions, reducer } = createSlice({
  name: 'domain/ideaList',
  initialState,
  reducers: {
    setIdeaListData,
    setIdeaContainersData
  }
})

const rootSelector = (state: AllState): types.IdeaListState => state.domain.ideaList

export const ideaListDataSelector = createSelector(rootSelector, (state) => state.ideaList)
export const ideaContainersDataSelector = createSelector(rootSelector, (state) => state.ideaContainers)
