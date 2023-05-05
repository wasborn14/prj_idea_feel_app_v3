import React, { CSSProperties } from 'react'
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { TreeItem, Props as TreeItemProps } from './TreeItem'
// import { iOS } from "../../utilities";

interface Props extends TreeItemProps {
  id: string
}

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
  isSorting || wasDragging ? false : true

export const SortableTreeItem = ({ id, depth, ...props }: Props) => {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    animateLayoutChanges
  })
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition
  }

  return (
    <TreeItem
      id={id}
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      ghost={isDragging}
      // for iOS setting
      // disableSelection={iOS}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners
      }}
      {...props}
    />
  )
}
