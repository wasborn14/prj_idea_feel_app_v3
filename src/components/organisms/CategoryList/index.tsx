import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Announcements,
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent,
  DragEndEvent,
  DragOverEvent,
  MeasuringStrategy,
  DropAnimation,
  Modifier,
  defaultDropAnimation,
  TouchSensor,
  MouseSensor
} from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'

import {
  buildTree,
  flattenTree,
  getProjection,
  getChildCount,
  removeItem,
  removeChildrenOf,
  setProperty
} from './utilities'
import type { FlattenedItem, SensorContext, TreeItems } from './types'
import { SortableTreeItem } from './Items/SortableTreeItem'
import { CSS } from '@dnd-kit/utilities'
import { InputItem } from './Items/InputItem'
import { useDispatch, useSelector } from 'react-redux'
import { actionCategoryIdSelector, actions, haveChildActionCategoryIdSelector } from '@/store/app/category'
import { Menu, Item, Separator } from 'react-contexify'
import 'react-contexify/ReactContexify.css'
import styled from 'styled-components'
import { sideWidthSelector } from '@/store/app/window'
import { pc, sp } from '@/media'
import { Spacer } from '@/components/atoms/Spacer'
import { ConfirmModal } from '@/components/mlecules/BaseModal/ConfirmModal'
import { useGetCategory, usePutCategory } from '@/hooks/api/category'
import { usePostIdeaList } from '@/hooks/api/idea'

export const RESET_IDEA_ID = ''
const MENU_ID = 'category_context_menu'

const initialItems: TreeItems = []

const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5
        })
      }
    ]
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing
    })
  }
}

interface Props {
  collapsible?: boolean
  defaultItems?: TreeItems
  indentationWidth?: number
  indicator?: boolean
  removable?: boolean
}

export const CategoryList = ({
  collapsible = true,
  defaultItems = initialItems,
  indicator = false,
  indentationWidth = 24
}: Props) => {
  const dispatch = useDispatch()
  const actionCategoryId = useSelector(actionCategoryIdSelector)
  const haveChildActionCategoryId = useSelector(haveChildActionCategoryIdSelector)
  const sideWidth = useSelector(sideWidthSelector)
  const [items, setItems] = useState(() => defaultItems)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)
  const [offsetLeft, setOffsetLeft] = useState(0)
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: string | null
    overId: string
  } | null>(null)
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)

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
  const sensorContext: SensorContext = useRef({
    items: flattenedItems,
    offset: offsetLeft
  })
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  const sortedIds = useMemo(() => flattenedItems.map(({ id }) => id), [flattenedItems])
  const activeItem = activeId ? flattenedItems.find(({ id }) => id === activeId) : null

  useEffect(() => {
    sensorContext.current = {
      items: flattenedItems,
      offset: offsetLeft
    }
  }, [flattenedItems, offsetLeft])

  const announcements: Announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`
    },
    onDragMove() {
      return getMovementAnnouncement('onDragMove')
    },
    onDragOver() {
      return getMovementAnnouncement('onDragOver')
    },
    onDragEnd() {
      return getMovementAnnouncement('onDragEnd')
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`
    }
  }

  const { data: categoryListData } = useGetCategory()

  useEffect(() => {
    if (categoryListData) {
      setItems(categoryListData.data)
    }
  }, [categoryListData])

  const handleDragStart = ({ active: { id: activeDragId } }: DragStartEvent) => {
    setActiveId(String(activeDragId))
    setOverId(String(activeDragId))

    const activeDragItem = flattenedItems.find(({ id }) => id === activeDragId)

    if (activeDragItem) {
      setActiveTitle(activeDragItem.title)
      setCurrentPosition({
        parentId: activeDragItem.parentId,
        overId: String(activeDragId)
      })
    }

    document.body.style.setProperty('cursor', 'grabbing')
  }

  const handleDragMove = ({ delta }: DragMoveEvent) => {
    setOffsetLeft(delta.x)
  }

  const handleDragOver = ({ over }: DragOverEvent) => {
    setOverId(over?.id ? String(over.id) : null)
  }

  const { mutate: putCategoryList } = usePutCategory()

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
    setCurrentPosition(null)

    document.body.style.setProperty('cursor', '')
  }

  const handleRemove = (id: string) => {
    // TODO:ideaのdelete処理追加
    setItems(() => removeItem(items, id))
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

  const getMovementAnnouncement = (eventName: string) => {
    if (overId && projected) {
      if (eventName !== 'onDragEnd') {
        if (currentPosition && projected.parentId === currentPosition.parentId && overId === currentPosition.overId) {
          return
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId
          })
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(JSON.stringify(flattenTree(items)))
      const overIndex = clonedItems.findIndex(({ id }) => id === overId)
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId)
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex)

      const previousItem = sortedItems[overIndex - 1]

      let announcement
      const movedVerb = eventName === 'onDragEnd' ? 'dropped' : 'moved'
      const nestedVerb = eventName === 'onDragEnd' ? 'dropped' : 'nested'

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1]
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: string | null = previousSibling.parentId
            previousSibling = sortedItems.find(({ id }) => id === parentId)
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`
          }
        }
      }

      return announcement
    }

    return
  }

  const adjustTranslate: Modifier = ({ transform }) => {
    return {
      ...transform,
      y: transform.y - 25
    }
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
        console.log('err', err)
      }
    })
  }

  const handleEditItem = (id: string, title: string) => {
    const changedItems = setProperty(items, id, 'title', () => {
      return title
    })
    setItems(changedItems)
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
    <Container sideWidth={sideWidth}>
      {confirmModalVisible && (
        <ConfirmModal
          description='test'
          onCancelClick={() => setConfirmModalVisible(false)}
          onApproveClick={() => handleRemove(actionCategoryId)}
        />
      )}
      <DndContext
        id='context'
        accessibility={{ announcements }}
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
    </Container>
  )
}

const Container = styled.div<{ sideWidth: number }>`
  width: ${({ sideWidth }) => sideWidth}px;
  ${pc`
    position: fixed;
    height: 100vh;
    overflow-y: scroll;
    /*スクロールバー非表示（Chrome・Safari）*/
    &::-webkit-scrollbar{
      display:none;
    }
  `}
  ${sp`
    width: 100%;
  `}
`
