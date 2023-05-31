import React, { useEffect, useState } from 'react'
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
import { SortableItem } from './SotableItem'

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

type Item = { id: string; title: string; selected: boolean }

const initialItems: Item[] = [
  { id: '1', title: 'Title1', selected: false },
  { id: '2', title: 'Title2', selected: true },
  { id: '3', title: 'Title3', selected: false },
  { id: '4', title: 'Title4', selected: false },
  { id: '5', title: 'Title5', selected: false }
]

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
  removable,
  reorderItems = arrayMove,
  strategy = horizontalListSortingStrategy,
  useDragOverlay = true
}: SortableProps) {
  const [items, setItems] = useState<Item[]>(initialItems)
  useEffect(() => {
    console.log({ items })
  })
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint
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
  const getIndex = (id: UniqueIdentifier) => items.findIndex((item) => item.id === id)
  const activeIndex = activeId ? getIndex(activeId) : -1
  const handleRemove = removable
    ? (id: UniqueIdentifier) => setItems((targetItems) => targetItems.filter((item) => item.id !== id))
    : undefined

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
        console.log({ over })
        setActiveId(null)
        if (over) {
          const overIndex = getIndex(over.id)
          if (activeIndex !== overIndex) {
            setItems((targetItems) => reorderItems(targetItems, activeIndex, overIndex))
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
      measuring={measuring}
      modifiers={modifiers}
    >
      <SortableContext items={items} strategy={strategy}>
        <List>
          {items.map((value, index) => (
            <SortableItem
              key={`tab_${value.id}`}
              id={value.id}
              title={value.title}
              selected={value.selected}
              handle={handle}
              index={index}
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
                <Item value={items[activeIndex].id} title={items[activeIndex].title} handle={handle} dragOverlay />
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
