import React, { useState } from 'react'
import { createPortal } from 'react-dom'

import {
  closestCenter,
  CollisionDetection,
  DragOverlay,
  DndContext,
  DropAnimation,
  KeyboardSensor,
  KeyboardCoordinateGetter,
  Modifiers,
  MouseSensor,
  MeasuringConfiguration,
  PointerActivationConstraint,
  ScreenReaderInstructions,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  AnimateLayoutChanges,
  NewIndexGetter,
  horizontalListSortingStrategy,
  SortingStrategy
} from '@dnd-kit/sortable'

import { Item } from './Item'
import styled from 'styled-components'
import { SortableItem } from './Item/SotableItem'
import { useGetTabList, usePutTabList } from '@/hooks/api/tab'
import { useDispatch, useSelector } from 'react-redux'
import { actions, tabListDataSelector } from '@/store/domain/tabList'
import { changeTabListSelectStatus } from './utils'
import { useRouter } from 'next/router'

export interface SortableProps {
  activationConstraint?: PointerActivationConstraint
  animateLayoutChanges?: AnimateLayoutChanges
  adjustScale?: boolean
  collisionDetection?: CollisionDetection
  coordinateGetter?: KeyboardCoordinateGetter
  dropAnimation?: DropAnimation | null
  getNewIndex?: NewIndexGetter
  handle?: boolean
  itemCount?: number
  items?: UniqueIdentifier[]
  measuring?: MeasuringConfiguration
  modifiers?: Modifiers
  removable?: boolean
  reorderItems?: typeof arrayMove
  strategy?: SortingStrategy
  style?: React.CSSProperties
  useDragOverlay?: boolean
  isDisabled?(id: UniqueIdentifier): boolean
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
}

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
}

export function Sortable({
  activationConstraint,
  animateLayoutChanges,
  collisionDetection = closestCenter,
  coordinateGetter = sortableKeyboardCoordinates,
  dropAnimation = dropAnimationConfig,
  getNewIndex,
  handle = false,
  measuring,
  modifiers,
  reorderItems = arrayMove,
  strategy = horizontalListSortingStrategy,
  useDragOverlay = true
}: SortableProps) {
  useGetTabList()
  const tabList = useSelector(tabListDataSelector)
  const { mutate: putTabMutate } = usePutTabList()
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const router = useRouter()
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // set distance to separate onclick
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint
    }),
    useSensor(KeyboardSensor, {
      // Disable smooth scrolling in Cypress automated tests
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter
    })
  )
  //   const getIndex = (id: UniqueIdentifier) => items.indexOf(id)
  const getIndex = (id: UniqueIdentifier) => tabList.findIndex((item) => item.id === id)
  const activeIndex = activeId ? getIndex(activeId) : -1
  // const handleRemove = removable
  //   ? (id: UniqueIdentifier) => setItems((targetItems) => targetItems.filter((item) => item.id !== id))
  //   : undefined
  const handleRemove = (id: UniqueIdentifier) => {
    const removedTagList = tabList.filter((tab) => tab.id !== id)
    putTabMutate({ tab_list: removedTagList })
  }
  const handleSelect = (id: UniqueIdentifier) => {
    const changedTabList = changeTabListSelectStatus(tabList, id)
    putTabMutate({ tab_list: changedTabList })
    router.push({
      pathname: `/category/idea/${id}`
    })
  }

  const dispatch = useDispatch()

  return (
    <DndContext
      accessibility={{
        screenReaderInstructions
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return
        }
        setActiveId(active.id)
      }}
      onDragEnd={({ over }) => {
        setActiveId(null)
        if (over) {
          const overIndex = getIndex(over.id)
          if (activeIndex !== overIndex) {
            dispatch(actions.setTabListData({ tabList: reorderItems(tabList, activeIndex, overIndex) }))
            putTabMutate({ tab_list: reorderItems(tabList, activeIndex, overIndex) })
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <SortableContext items={tabList} strategy={strategy}>
        <List>
          {tabList.map((value, index) => (
            <SortableItem
              key={`tab_${value.id}`}
              id={value.id}
              title={value.title}
              selected={value.selected}
              handle={handle}
              index={index}
              onSelect={handleSelect}
              onRemove={handleRemove}
              animateLayoutChanges={animateLayoutChanges}
              useDragOverlay={useDragOverlay}
              getNewIndex={getNewIndex}
            />
          ))}
        </List>
      </SortableContext>
      {useDragOverlay
        ? createPortal(
            <DragOverlay dropAnimation={dropAnimation}>
              {activeId ? (
                <Item value={tabList[activeIndex].id} title={tabList[activeIndex].title} handle={handle} dragOverlay />
              ) : null}
            </DragOverlay>,
            document.body
          )
        : null}
    </DndContext>
  )
}

const List = styled.div`
  display: flex;
`
