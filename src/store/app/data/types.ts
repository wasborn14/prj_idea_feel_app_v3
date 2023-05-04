import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type DataState = {
  isLoading?: boolean // ローディング状態 true：ローディング中
}

export type SetDataState = CaseReducer<DataState, PayloadAction<DataState>>
