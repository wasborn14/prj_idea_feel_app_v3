import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type CategoryState = {
  selectCategoryId: string // 選択対象のID
  actionCategoryId: string // アクション対象のID
  haveChildActionCategoryId: boolean // アクション対象のIDが子要素を持つかどうか
  editCategoryId: string // 編集中のID
}

export type CategoryPayloadState = {
  selectCategoryId?: string // 選択対象のID
  actionCategoryId?: string // アクション対象のID
  haveChildActionCategoryId?: boolean // アクション対象のIDが子要素を持つかどうか
  editCategoryId?: string // 編集中のID
}

export type SetCategoryState = CaseReducer<CategoryState, PayloadAction<CategoryPayloadState>>
