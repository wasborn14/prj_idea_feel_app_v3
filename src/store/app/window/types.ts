import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type WindowState = {
  sideWidth: number
  mainContentsWidth: number
}

export type SetWindowState = CaseReducer<WindowState, PayloadAction<WindowState>>
