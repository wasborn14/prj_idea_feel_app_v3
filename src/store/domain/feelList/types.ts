import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type FeelModel = {
  date: string
  detail: {
    value: number
    reason: number
    memo: string
  }
}

export type FeelListState = {
  feel_list: FeelModel[]
  predict_list: FeelModel[]
}

export type SetFeelListData = CaseReducer<FeelListState, PayloadAction<FeelListState>>
