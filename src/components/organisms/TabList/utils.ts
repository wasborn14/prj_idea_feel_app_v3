import { TabList } from '@/store/domain/tabList/types'
import { UniqueIdentifier } from '@dnd-kit/core'

export const changeTabListSelectStatus = (tabList: TabList, id: UniqueIdentifier): TabList => {
  const newTabList: TabList = []
  tabList.forEach((tab) => {
    if (tab.id === id && tab.selected) {
      newTabList.push({ id: tab.id, title: tab.title, selected: tab.selected })
    } else if (tab.id === id) {
      newTabList.push({ id: tab.id, title: tab.title, selected: !tab.selected })
    } else if (tab.selected) {
      newTabList.push({ id: tab.id, title: tab.title, selected: !tab.selected })
    } else {
      newTabList.push({ id: tab.id, title: tab.title, selected: tab.selected })
    }
  })
  return newTabList
}

export const clearSelectStatusTabList = (tabList: TabList): TabList => {
  const newTabList: TabList = []
  tabList.forEach((tab) => {
    newTabList.push({ id: tab.id, title: tab.title, selected: false })
  })
  return newTabList
}
