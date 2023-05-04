import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type FeelReason = {
  id: number
  title: string
}

export type FeelReasonListState = FeelReason[]

export type SetFeelReasonListData = CaseReducer<FeelReasonListState, PayloadAction<FeelReasonListState>>
