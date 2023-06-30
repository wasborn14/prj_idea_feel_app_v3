import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type FeelModel = {
  date: string
  detail: {
    value: number
    reason: number
    memo: string
  }
}

export type FeelGraphState = {
  record_list: FeelModel[]
  predict_list: FeelModel[]
}

export type SetFeelGraphData = CaseReducer<FeelGraphState, PayloadAction<FeelGraphState>>
