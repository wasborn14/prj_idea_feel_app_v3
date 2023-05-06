import { IdeaListJsonModel, IdeaListModel } from '@/store/domain/ideaList/types'

export const convertToArray = (items: IdeaListModel) => {
  return Object.entries(items).map(([key, value]) => ({ key: key, value: value }))
}

export const convertToObject = (items: IdeaListJsonModel) => {
  return items.reduce((obj, item) => Object.assign(obj, { [item.key]: item.value }), {})
}
