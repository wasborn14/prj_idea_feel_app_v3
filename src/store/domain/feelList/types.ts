import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type FeelModel = {
  feel: number
  detail: {
    date: string
    reason: number
    memo: string
  }
}

export type FeelListState = {
  feel_list: FeelModel[]
  predict_list: FeelModel[]
}

export type SetFeelListData = CaseReducer<FeelListState, PayloadAction<FeelListState>>
