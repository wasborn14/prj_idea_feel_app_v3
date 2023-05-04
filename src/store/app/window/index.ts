import * as types from './types'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const initialAuthState = []

const initialState: types.WindowState = {
  sideWidth: 250,
  mainContentsWidth: 375
}

const setWidth: types.SetWindowState = (state, { payload }) =>
  (state = {
    sideWidth: payload.sideWidth,
    mainContentsWidth: payload.mainContentsWidth
  })

export const { actions, reducer } = createSlice({
  name: 'app/window',
  initialState,
  reducers: {
    setWidth
  }
})

const rootSelector = (state: AllState): types.WindowState => state.app.window

export const windowStateSelector = createSelector(rootSelector, (state) => state)
export const sideWidthSelector = createSelector(rootSelector, (state) => state.sideWidth)
export const mainContentsWidthSelector = createSelector(rootSelector, (state) => state.mainContentsWidth)
