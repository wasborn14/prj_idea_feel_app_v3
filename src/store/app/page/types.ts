import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type PageState = {
  title: string // ページタイトル
}

export type SetDataState = CaseReducer<PageState, PayloadAction<PageState>>
