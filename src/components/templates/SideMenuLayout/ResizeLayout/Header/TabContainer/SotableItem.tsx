import React from 'react'

import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable, AnimateLayoutChanges, NewIndexGetter } from '@dnd-kit/sortable'
import { Item } from './Item'

interface SortableItemProps {
  animateLayoutChanges?: AnimateLayoutChanges
  getNewIndex?: NewIndexGetter
  id: UniqueIdentifier
  title: string
  selected?: boolean
  index: number
  handle: boolean
  useDragOverlay?: boolean
  onSelect?(id: UniqueIdentifier): void
  onRemove?(id: UniqueIdentifier): void
}

export const SortableItem = ({
  animateLayoutChanges,
  getNewIndex,
  handle,
  id,
  title,
  selected,
  index,
  onSelect,
  onRemove,
  useDragOverlay
}: SortableItemProps) => {
  const { attributes, isDragging, isSorting, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id,
      animateLayoutChanges,
      getNewIndex
    })

  return (
    <Item
      ref={setNodeRef}
      value={id}
      title={title}
      selected={selected}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      handleProps={
        handle
          ? {
              ref: setActivatorNodeRef
            }
          : undefined
      }
      index={index}
      onSelect={onSelect ? () => onSelect(id) : undefined}
      onRemove={onRemove ? () => onRemove(id) : undefined}
      transform={transform}
      transition={transition}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  )
}
