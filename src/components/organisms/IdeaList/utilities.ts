import { UniqueIdentifier } from '@dnd-kit/core'
import { IdeaListModel } from '@/store/domain/ideaList/types'

const IDEA_IDENTIFIER = 'IDEA_IDENTIFIER'

export const createNewTitle = (inputTitle: UniqueIdentifier, items: IdeaListModel): UniqueIdentifier => {
  if (findId(inputTitle, items)) {
    return createNewCopyTitle(inputTitle, items, 0)
  } else {
    return inputTitle
  }
}

// copyが既にあった場合、末尾に一番低い数字を割り当てる
const createNewCopyTitle = (title: UniqueIdentifier, items: IdeaListModel, number: number): UniqueIdentifier => {
  if (number) {
    const tempTitle = `${title}${IDEA_IDENTIFIER}${number}`
    if (findId(tempTitle, items)) {
      return createNewCopyTitle(title, items, number + 1)
    } else {
      return tempTitle
    }
  } else {
    const tempTitle = `${title}${IDEA_IDENTIFIER}`
    if (findId(tempTitle, items)) {
      return createNewCopyTitle(title, items, 1)
    } else {
      return tempTitle
    }
  }
}

// itemsの中にidが含まれているかをチェックする
const findId = (id: UniqueIdentifier, items: IdeaListModel) => {
  if (id in items) {
    return true
  }

  const containerId = Object.keys(items).find((key) => items[key].includes(id))
  return containerId ? true : false
}

export const createViewTitle = (title: string) => {
  if (!title) {
    return ''
  }
  var regex = new RegExp(/.*?IDEA_IDENTIFIER$/)
  if (regex.test(title.toString())) {
    return title.toString().replace(/IDEA_IDENTIFIER$/, '')
  } else {
    return title.toString().replace(/IDEA_IDENTIFIER[0-9]{1,10}$/, '')
  }
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (err) {
    return false
  }
}
