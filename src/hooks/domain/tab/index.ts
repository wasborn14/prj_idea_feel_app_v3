import { changeTabListSelectStatus } from '@/components/templates/SideMenuLayout/ResizeLayout/Header/TabContainer/utils'
import { clearSelectStatusTabList } from '@/components/templates/SideMenuLayout/ResizeLayout/Header/TabContainer/utils'
import { usePutTabList } from '@/hooks/api/tab'
import { actions, tabListDataSelector } from '@/store/domain/tabList'
import { TabList } from '@/store/domain/tabList/types'
import { useDispatch, useSelector } from 'react-redux'

export const useTabList = () => {
  const { mutate: putTabMutate } = usePutTabList()
  const tabList = useSelector(tabListDataSelector)
  const dispatch = useDispatch()

  // exist tab: make tab into the state of selected
  // not exist tab: create tab and make into the state of selected
  const addTab = (id: string, title: string) => {
    const existTab = tabList.some((tab) => {
      if (tab.id === id) {
        const changedTabList = changeTabListSelectStatus(tabList, id)
        putTabMutate({ tab_list: changedTabList })
        return true
      }
      return false
    })
    if (!existTab) {
      const newTab = { id: id, title: title, selected: true }
      const clearedSelectStatusTabList = clearSelectStatusTabList(tabList)
      const addedTabList = [...clearedSelectStatusTabList, newTab]
      putTabMutate({ tab_list: addedTabList })
    }
  }

  const editTab = (id: string, changedTitle: string) => {
    const editedTabList: TabList = []
    tabList.forEach((tab) => {
      if (tab.id === id) {
        editedTabList.push({ id: tab.id, title: changedTitle, selected: tab.selected })
      } else {
        editedTabList.push({ id: tab.id, title: tab.title, selected: tab.selected })
      }
    })
    dispatch(actions.setTabListData({ tabList: editedTabList }))
  }

  const deleteTab = (id: string) => {
    const deletedTabList = tabList.filter((tab) => tab.id !== id)
    dispatch(actions.setTabListData({ tabList: deletedTabList }))
  }

  return { addTab, editTab, deleteTab }
}
