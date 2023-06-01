import React, { useEffect } from 'react'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'

import styled, { css } from 'styled-components'
import { fontStyles } from '@/const/font'
import { Color } from '@/const'
import { Remove } from '@/components/atoms/DndItems'

export interface Props {
  dragOverlay?: boolean
  disabled?: boolean
  dragging?: boolean
  handle?: boolean
  handleProps?: any
  index?: number
  fadeIn?: boolean
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  transition?: string | null
  value: React.ReactNode
  title: string
  selected?: boolean
  onSelect?(): void
  onRemove?(): void
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        dragOverlay,
        handle = true,
        handleProps,
        index,
        listeners,
        onSelect,
        onRemove,
        transition,
        transform,
        title,
        selected,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return
        }

        document.body.style.cursor = 'grabbing'

        return () => {
          document.body.style.cursor = ''
        }
      }, [dragOverlay])

      return (
        <List
          style={
            {
              height: 36,
              width: 150,
              transition: [transition].filter(Boolean).join(', '),
              '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
              '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
              '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
              '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
              '--index': index
            } as React.CSSProperties
          }
          ref={ref}
        >
          <ItemWrapper
            data-cypress='draggable-item'
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
            {...handleProps}
            selected={selected}
            dragOverlay={dragOverlay}
          >
            <TitleWrapper onClick={onSelect}>{title}</TitleWrapper>
            <IconWrapper onClick={onRemove}>
              <Remove />
            </IconWrapper>
          </ItemWrapper>
        </List>
      )
    }
  )
)

const List = styled.li`
  font-weight: 400;
  border-color: #efefef;
  color: #333;
  box-shadow: 0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05),
    0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15);

  display: flex;
  box-sizing: border-box;
  transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1))
    scaleY(var(--scale-y, 1));
  transform-origin: 0 0;
  touch-action: manipulation;
`

const ItemWrapper = styled.div<{
  selected: boolean
  dragOverlay: boolean
}>`
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  ${fontStyles['16px']}
  border-radius: calc(4px / var(--scale-x, 1));
  box-sizing: border-box;
  transform-origin: 50% 50%;
  -webkit-tap-highlight-color: transparent;
  font-weight: $font-weight;
  white-space: nowrap;
  transform: scale(var(--scale, 1));
  transition: box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${Color.BACKGROUND_COLOR1};
    `}

  ${({ dragOverlay }) =>
    dragOverlay &&
    css`
      background-color: ${Color.LIGHT_BROWN4};
      animation: pop 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
      transform: scale(var(--scale));
      box-shadow: var(--box-shadow-picked-up);
      opacity: 1;
      z-index: 100;
    `}
`

const TitleWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
`

const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`
