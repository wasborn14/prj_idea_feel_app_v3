import * as types from './types'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialAuthState = []

const initialState: types.PageState = {
  title: ''
}

const setPageTitle: types.SetDataState = (state, { payload }) =>
  (state = {
    title: payload.title
  })

export const { actions, reducer } = createSlice({
  name: 'app/page',
  initialState,
  reducers: {
    setPageTitle
  }
})

const rootSelector = (state: AllState): types.PageState => state.app.page

export const pageStateSelector = createSelector(rootSelector, (state) => state)
export const pageTitleSelector = createSelector(rootSelector, (state) => state.title)
