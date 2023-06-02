import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  TouchSensor,
  MouseSensor
} from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { dropAnimationConfig, measuring, adjustTranslate } from './configs'
import {
  buildTree,
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty
} from './utilities'
import type { FlattenedItem, TreeItems } from './types'
import { SortableTreeItem } from './Items/SortableTreeItem'
import { InputItem } from './Items/InputItem'
import { useDispatch, useSelector } from 'react-redux'
import { actionCategoryIdSelector, actions, haveChildActionCategoryIdSelector } from '@/store/app/category'
import { Menu, Item, Separator } from 'react-contexify'
import 'react-contexify/ReactContexify.css'
import { Spacer } from '@/components/atoms/Spacer'
import { ConfirmModal } from '@/components/mlecules/BaseModal/ConfirmModal'
import { useGetCategory, usePutCategory } from '@/hooks/api/category'
import { usePostIdeaList } from '@/hooks/api/idea'
import { useTabList } from '@/hooks/domain/tab'

export const RESET_IDEA_ID = ''
const MENU_ID = 'category_context_menu'

interface Props {
  collapsible?: boolean
  indentationWidth?: number
  indicator?: boolean
  removable?: boolean
}

export const CategoryList = ({ collapsible = true, indicator = false, indentationWidth = 24 }: Props) => {
  const dispatch = useDispatch()
  const actionCategoryId = useSelector(actionCategoryIdSelector)
  const haveChildActionCategoryId = useSelector(haveChildActionCategoryIdSelector)
  const [items, setItems] = useState<TreeItems>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))
  const { data: categoryListData } = useGetCategory()
  const { mutate: putCategoryList } = usePutCategory()
  const { editTab, deleteTab } = useTabList()

  const flattenedItems = useMemo(() => {
    const flattenedTree = flattenTree(items)
    const collapsedItems = flattenedTree.reduce<string[]>(
      (acc, { children, collapsed, id }) => (collapsed && children.length ? [...acc, id] : acc),
      []
    )

    return removeChildrenOf(flattenedTree, activeId ? [activeId, ...collapsedItems] : collapsedItems)
  }, [activeId, items])

  const projected =
    activeId && overId ? getProjection(flattenedItems, activeId, overId, offsetLeft, indentationWidth) : null
  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems])
  const activeItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null

  useEffect(() => {
    if (categoryListData) {
      setItems(categoryListData.data)
    }
  }, [categoryListData])

  // -------------- handleDragEvents ----------------

  const handleDragStart = ({ active: { id: activeDragId } }: DragStartEvent) => {
    setActiveId(String(activeDragId))
    setOverId(String(activeDragId))

    const activeDragItem = flattenedItems.find(({ id }) => id === activeDragId)

    if (activeDragItem) {
      setActiveTitle(activeDragItem.title)
    }

    document.body.style.setProperty('cursor', 'grabbing')
  }

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x)
  }

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverId(over?.id ? String(over.id) : null)
  }

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    resetState()

    if (projected && over) {
      const { depth, parentId } = projected
      const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenTree(items)))
      const overIndex = clonedItems.findIndex(({ id }) => id === over.id)
      const activeIndex = clonedItems.findIndex(({ id }) => id === active.id)
      const activeTreeItem = clonedItems[activeIndex]

      clonedItems[activeIndex] = { ...activeTreeItem, depth, parentId }

      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)
      const newItems = buildTree(sortedItems)

      setItems(newItems)
      putCategoryList({ category_list: newItems })
    }
  }

  const handleDragCancel = () => {
    resetState()
  }

  const resetState = () => {
    setOverId(null)
    setActiveId(null)
    setActiveTitle(null)
    setOffsetLeft(0)

    document.body.style.setProperty('cursor', '')
  }

  // -------------- handleDragEvents ----------------

  const handleRemove = (id: string) => {
    // TODO:ideaのdelete処理追加
    setItems(() => removeItem(items, id))
    deleteTab(id)
    putCategoryList({ category_list: removeItem(items, id) })
    setConfirmModalVisible(false)
  }

  const handleCollapse = (id: string) => {
    const changedItems = setProperty(items, id, 'collapsed', (value) => {
      return !value
    })
    setItems(changedItems)
    putCategoryList({ category_list: changedItems })
  }

  const { mutate: postIdeaList } = usePostIdeaList()

  const handleCreateItem = async (title: string) => {
    postIdeaList(undefined, {
      onSuccess: (res) => {
        const newId = res.data

        if (typeof newId !== 'string' || newId == RESET_IDEA_ID) {
          return
        }

        const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenTree(items)))
        const newItem = {
          id: newId,
          title,
          children: [],
          collapsed: false,
          depth: 0,
          index: 0,
          parentId: null
        }
        const newItems = buildTree([...clonedItems, newItem])

        setItems(newItems)
        putCategoryList({ category_list: newItems })
      }
    })
  }

  const handleAdd = (parentId: string) => {
    const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenTree(items)))
    const parentIndex = clonedItems.findIndex(({ id }) => id === parentId)
    const parentItem = clonedItems[parentIndex]
    const depth = parentItem.depth
    const children = parentItem.children

    const beforeItems = clonedItems.slice(0, parentIndex)
    const childrenFlattenedTree = flattenTree(children)
    const childrenLastIndex = parentIndex + childrenFlattenedTree.length
    const childrenItems = clonedItems.slice(parentIndex + 1, childrenLastIndex + 1)
    const afterItems = clonedItems.slice(childrenLastIndex + 1, clonedItems.length)

    postIdeaList(undefined, {
      onSuccess: (res) => {
        const newId = res.data
        const newItem = {
          id: newId,
          title: 'Untitled',
          children: [],
          collapsed: false,
          depth: depth + 1,
          index: children.length == 0 ? 0 : children.length,
          parentId: parentId
        }

        const newParentItem = { ...clonedItems[parentIndex], children: [...children, newItem] }
        const addedItems = [...beforeItems, newParentItem, ...childrenItems, newItem, ...afterItems]
        const newItems = buildTree(addedItems)
        setItems(newItems)
        putCategoryList({ category_list: newItems })
        dispatch(actions.setEditCategoryId({ editCategoryId: newId }))
      },
      onError: (err) => {
        console.error({ err })
      }
    })
  }

  const handleEditItem = (id: string, title: string) => {
    const changedItems = setProperty(items, id, 'title', () => {
      return title
    })
    setItems(changedItems)
    editTab(id, title)
    putCategoryList({ category_list: changedItems })
  }

  const handleContextMenuClick = (contextMenuId: string) => {
    switch (contextMenuId) {
      case 'create':
        handleAdd(actionCategoryId)
        break
      case 'edit':
        dispatch(actions.setEditCategoryId({ editCategoryId: actionCategoryId }))
        break
      case 'delete':
        haveChildActionCategoryId ? setConfirmModalVisible(true) : handleRemove(actionCategoryId)
        break
    }
  }

  return (
    <>
      {confirmModalVisible && (
        <ConfirmModal
          description='Are you sure you want to delete the child elements?'
          onCancelClick={() => setConfirmModalVisible(false)}
          onApproveClick={() => handleRemove(actionCategoryId)}
        />
      )}
      <DndContext
        id='context'
        sensors={sensors}
        collisionDetection={closestCenter}
        measuring={measuring}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={sortedIds} strategy={verticalListSortingStrategy}>
          {flattenedItems.map(({ id, title, children, collapsed, depth }) => (
            <SortableTreeItem
              key={id}
              id={id}
              value={title}
              depth={id === activeId && projected ? projected.depth : depth}
              indentationWidth={indentationWidth}
              indicator={indicator}
              collapsed={Boolean(collapsed && children.length)}
              onCollapse={collapsible && children.length ? () => handleCollapse(id) : undefined}
              onEdit={handleEditItem}
              haveChild={children.length > 0}
            />
          ))}
          {typeof window === 'object' &&
            createPortal(
              <DragOverlay dropAnimation={dropAnimationConfig} modifiers={indicator ? [adjustTranslate] : undefined}>
                {activeId && activeItem ? (
                  <SortableTreeItem
                    id={activeId}
                    depth={activeItem.depth}
                    clone
                    childCount={getChildCount(items, activeId) + 1}
                    value={activeTitle ?? ''}
                    indentationWidth={indentationWidth}
                  />
                ) : null}
              </DragOverlay>,
              document.body
            )}
          <InputItem depth={0} indentationWidth={indentationWidth} handleCreateItem={handleCreateItem} />
        </SortableContext>
        <Menu id={MENU_ID}>
          <Item id='create' onClick={() => handleContextMenuClick('create')}>
            Create
          </Item>
          <Item id='edit' onClick={() => handleContextMenuClick('edit')}>
            Edit
          </Item>
          <Separator />
          <Item id='delete' onClick={() => handleContextMenuClick('delete')}>
            Delete
          </Item>
        </Menu>
      </DndContext>
      <Spacer y={200} />
    </>
  )
}
