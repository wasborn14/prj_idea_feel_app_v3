import React, { useEffect, useState } from 'react'
import type { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'

import { Handle, Remove } from '@/components/atoms/DndItems'
import styled, { css } from 'styled-components'
import { ItemInput } from '../ItemInput'
import { createViewTitle, isValidUrl } from '../../utilities'
import { Color } from '@/const'
import { NewWindow } from '@/components/atoms/DndItems/NewWindow'
import Link from 'next/link'

export interface Props {
  dragOverlay?: boolean
  color?: string
  disabled?: boolean
  dragging?: boolean
  handle?: boolean
  handleProps?: any
  height?: number
  index?: number
  fadeIn?: boolean
  transform?: Transform | null
  listeners?: DraggableSyntheticListeners
  sorting?: boolean
  style?: React.CSSProperties
  transition?: string | null
  wrapperStyle?: React.CSSProperties
  containerId: UniqueIdentifier
  value: UniqueIdentifier
  onRemove: (containerId: UniqueIdentifier, value: UniqueIdentifier) => void
  renderItem?(args: {
    dragOverlay: boolean
    dragging: boolean
    sorting: boolean
    index: number | undefined
    fadeIn: boolean
    listeners: DraggableSyntheticListeners
    ref: React.Ref<HTMLElement>
    style: React.CSSProperties | undefined
    transform: Props['transform']
    transition: Props['transition']
    value: Props['value']
  }): React.ReactElement
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        fadeIn,
        handle,
        handleProps,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        style,
        transition,
        transform,
        containerId,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      const [isEdit, setIsEdit] = useState(false)
      const viewTitle = createViewTitle(value?.toString() ?? '')
      const isUrl = isValidUrl(viewTitle)

      useEffect(() => {
        if (!dragOverlay) {
          return
        }

        document.body.style.cursor = 'grabbing'

        return () => {
          document.body.style.cursor = ''
        }
      }, [dragOverlay])

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value
        })
      ) : (
        <Wrapper
          style={
            {
              ...wrapperStyle,
              transition: transition && [transition, wrapperStyle?.transition].filter(Boolean).join(', '),
              '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
              '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
              '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
              '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
              '--index': index,
              '--color': color
            } as React.CSSProperties
          }
          ref={ref}
        >
          {isEdit ? (
            <ItemInput value={value} containerId={containerId} onInputClose={() => setIsEdit(false)} />
          ) : (
            <ItemWrapper
              style={style}
              data-cypress='draggable-item'
              {...(!handle ? listeners : undefined)}
              {...props}
              tabIndex={!handle ? 0 : undefined}
            >
              <ItemLabel onClick={() => setIsEdit(true)} isUrl={isUrl}>
                {viewTitle}
              </ItemLabel>
              <ActionWrapper>
                {isUrl && (
                  <Link href={viewTitle} target='_blank' passHref>
                    <NewWindow />
                  </Link>
                )}
                {handle && <Handle {...handleProps} {...listeners} />}
              </ActionWrapper>
            </ItemWrapper>
          )}
          {onRemove && (
            <RemoveWrapper>
              <Remove onClick={() => onRemove(containerId, value)} />
            </RemoveWrapper>
          )}
        </Wrapper>
      )
    }
  )
)

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  transform: translate3d(var(--translate-x, 0), var(--translate-y, 0), 0) scaleX(var(--scale-x, 1))
    scaleY(var(--scale-y, 1));
  transform-origin: 0 0;
  touch-action: manipulation;
`

const ItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding: 6px 10px;
  background-color: ${Color.WHITE};
  box-shadow: 0 0 0 calc(1px / var(--scale-x, 1)) rgba(63, 63, 68, 0.05),
    0 1px calc(3px / var(--scale-x, 1)) 0 rgba(34, 33, 81, 0.15);
  outline: none;
  border-radius: calc(4px / var(--scale-x, 1));
  box-sizing: border-box;
  list-style: none;
  transform-origin: 50% 50%;

  -webkit-tap-highlight-color: transparent;

  color: #333;
  font-weight: 400;
  font-size: 1em;

  transform: scale(var(--scale, 1));
  transition: box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
`

const ItemLabel = styled.div<{ isUrl: boolean }>`
  width: 100%;
  max-width: 210px;
  ${({ isUrl }) =>
    !isUrl &&
    css`
      max-width: 230px;
    `}
  word-wrap: break-word;
`

const ActionWrapper = styled.span`
  display: flex;
  margin-top: -15px;
  margin-left: auto;
  margin-bottom: -15px;
`

const RemoveWrapper = styled.div`
  opacity: 0.2;
`
