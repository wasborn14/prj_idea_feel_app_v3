import * as types from './types'
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { AllState } from '@/store'

export const RESET_CATEGORY_ID = ''

const initialState: types.CategoryState = {
  selectCategoryId: RESET_CATEGORY_ID,
  actionCategoryId: RESET_CATEGORY_ID,
  haveChildActionCategoryId: false,
  editCategoryId: RESET_CATEGORY_ID
}

const setSelectCategoryId: types.SetCategoryState = (state, { payload }) =>
  (state = {
    selectCategoryId: payload.selectCategoryId ?? state.selectCategoryId,
    actionCategoryId: state.editCategoryId,
    haveChildActionCategoryId: state.haveChildActionCategoryId,
    editCategoryId: state.editCategoryId
  })

const setActionCategoryId: types.SetCategoryState = (state, { payload }) =>
  (state = {
    selectCategoryId: state.selectCategoryId,
    actionCategoryId: payload.actionCategoryId ?? state.editCategoryId,
    haveChildActionCategoryId: payload.haveChildActionCategoryId ?? state.haveChildActionCategoryId,
    editCategoryId: state.editCategoryId
  })

const setEditCategoryId: types.SetCategoryState = (state, { payload }) =>
  (state = {
    selectCategoryId: state.selectCategoryId,
    actionCategoryId: state.editCategoryId,
    haveChildActionCategoryId: state.haveChildActionCategoryId,
    editCategoryId: payload.editCategoryId ?? state.editCategoryId
  })

export const { actions, reducer } = createSlice({
  name: 'app/category',
  initialState,
  reducers: {
    setSelectCategoryId,
    setActionCategoryId,
    setEditCategoryId
  }
})

const rootSelector = (state: AllState): types.CategoryState => state.app.category

export const categoryStateSelector = createSelector(rootSelector, (state) => state)
export const selectCategoryIdSelector = createSelector(rootSelector, (state) => state.selectCategoryId)
export const actionCategoryIdSelector = createSelector(rootSelector, (state) => state.actionCategoryId)
export const haveChildActionCategoryIdSelector = createSelector(
  rootSelector,
  (state) => state.haveChildActionCategoryId
)
export const editCategoryIdSelector = createSelector(rootSelector, (state) => state.editCategoryId)
