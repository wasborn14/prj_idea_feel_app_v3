import { UniqueIdentifier } from '@dnd-kit/core'
import { CaseReducer, PayloadAction } from '@reduxjs/toolkit'

export type IdeaListModel = Record<UniqueIdentifier, UniqueIdentifier[]>
export type IdeaContainersModel = UniqueIdentifier[]
export type IdeaListJsonModel = { key: string; value: UniqueIdentifier[] }[]

export type IdeaListState = {
  ideaList: IdeaListModel
  ideaContainers: IdeaContainersModel
}

type IdeaListPayloadState = {
  ideaList?: IdeaListModel
  ideaContainers?: IdeaContainersModel
}

export type SetIdeaListData = CaseReducer<IdeaListState, PayloadAction<IdeaListPayloadState>>
