import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type Tab = { id: string; title: string; selected: boolean }
export type TabList = Tab[]
export type TabListModel = TabList

export type TabListState = {
  tabList: TabListModel
}

export type SetTabListData = CaseReducer<TabListState, PayloadAction<TabListState>>
