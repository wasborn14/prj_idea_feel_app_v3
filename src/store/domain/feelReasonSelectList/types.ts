import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'
import { Option } from 'react-dropdown'

export type FeelReasonSelectListState = {
  options: Option[]
}

export type SetFeelReasonSelectListData = CaseReducer<
  FeelReasonSelectListState,
  PayloadAction<FeelReasonSelectListState>
>
