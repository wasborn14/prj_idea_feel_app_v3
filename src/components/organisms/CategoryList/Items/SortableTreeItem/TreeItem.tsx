import React, { forwardRef, HTMLAttributes } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Action, Handle } from '@/components/atoms/DndItems'
import {
  actions as categoryActions,
  editCategoryIdSelector,
  RESET_CATEGORY_ID,
  selectCategoryIdSelector
} from '@/store/app/category'
import styled, { css } from 'styled-components'
import { EditItem } from '../EditItem'
import { useContextMenu } from 'react-contexify'
import { Color } from '@/const'
import { useRouter } from 'next/router'
import { actions } from '@/store/app/page'
import { sp } from '@/media'

const MENU_ID = 'category_context_menu'

type TriggerEvent = MouseEvent | TouchEvent | KeyboardEvent | React.MouseEvent | React.TouchEvent | React.KeyboardEvent
export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  id: string
  childCount?: number
  clone?: boolean
  collapsed?: boolean
  depth: number
  disableInteraction?: boolean
  disableSelection?: boolean
  ghost?: boolean
  handleProps?: any
  indicator?: boolean
  indentationWidth: number
  value: string
  onCollapse?(): void
  onEdit?: (id: string, title: string) => void
  wrapperRef?(node: HTMLLIElement): void
  haveChild?: boolean
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      id,
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      haveChild,
      onEdit,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const editCategoryId = useSelector(editCategoryIdSelector)
    const selectCategoryId = useSelector(selectCategoryIdSelector)

    const handleCloseInput = () => {
      dispatch(categoryActions.setEditCategoryId({ editCategoryId: RESET_CATEGORY_ID }))
    }

    const { show } = useContextMenu({
      id: MENU_ID
    })

    const handleContextMenu = (event: TriggerEvent) => {
      dispatch(
        categoryActions.setActionCategoryId({
          actionCategoryId: id,
          haveChildActionCategoryId: haveChild
        })
      )
      show({
        event
      })
    }

    const handleSelectItem = () => {
      dispatch(categoryActions.setSelectCategoryId({ selectCategoryId: id }))
      dispatch(actions.setPageTitle({ title: value }))
      router.push({
        pathname: `/category/idea/${id}`
      })
    }

    return (
      <>
        {id == editCategoryId ? (
          <EditItem
            id={id}
            value={value}
            depth={depth}
            indentationWidth={indentationWidth}
            handleCloseInput={handleCloseInput}
            handleEditItem={onEdit}
          />
        ) : (
          <Wrapper
            clone={clone ?? false}
            ghost={ghost ?? false}
            indicator={indicator ?? false}
            disableSelection={disableSelection ?? false}
            disableInteraction={disableInteraction ?? false}
            selected={id == selectCategoryId}
            ref={wrapperRef}
            style={
              {
                '--spacing': `${indentationWidth * depth}px`
              } as React.CSSProperties
            }
            {...props}
          >
            <TreeItemWrapper
              className='TreeItemWrapper'
              ref={ref}
              style={style}
              onContextMenu={(event) => handleContextMenu(event)}
              onClick={handleSelectItem}
            >
              <Handle {...handleProps} />
              {onCollapse && (
                <ActionWrapper collapsed={collapsed ?? false}>
                  <Action onClick={onCollapse}>
                    <CollapseIconWrapper>{collapseIcon}</CollapseIconWrapper>
                  </Action>
                </ActionWrapper>
              )}
              <Text>{value}</Text>
              {clone && childCount && childCount > 1 ? <Count className='Count'>{childCount}</Count> : null}
            </TreeItemWrapper>
          </Wrapper>
        )}
      </>
    )
  }
)

const collapseIcon = (
  <svg width='10' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 70 41'>
    <path d='M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z' />
  </svg>
)

const Wrapper = styled.li<{
  clone: boolean
  ghost: boolean
  indicator: boolean
  disableSelection: boolean
  disableInteraction: boolean
  selected: boolean
}>`
  // Wrapper
  list-style: none;
  box-sizing: border-box;
  padding-left: var(--spacing);
  margin-bottom: -1px;
  width: 500px;
  box-sizing: border-box;
  &:hover {
    background-color: ${Color.DARK_BROWN3};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${Color.BACKGROUND_COLOR1};
    `}

  // clone
  ${({ clone }) =>
    clone &&
    css`
      background-color: ${Color.LIGHT_BROWN3};
      display: inline-block;
      pointer-events: none;
      padding: 0;
      padding-left: 10px;
      width: 200px;
      overflow-x: hidden;
      border-radius: 8px;

      .TreeItemWrapper {
        --vertical-padding: 5px;
        padding-right: 24px;
        border-radius: 4px;
        box-shadow: 0px 15px 15px 0 ${Color.DARK_BLUE2};
      }
    `}

  // ghost

    ${({ ghost, indicator }) =>
    ghost &&
    indicator &&
    css`
      opacity: 1;
      position: relative;
      z-index: 1;
      margin-bottom: -1px;

      .TreeItemWrapper {
        position: relative;
        padding: 0;
        height: 8px;
        border-color: ${Color.BLUE};
        background-color: ${Color.BLUE};

        &:before {
          position: absolute;
          left: -8px;
          top: -4px;
          display: block;
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid ${Color.BLUE};
          background-color: ${Color.WHITE};
        }

        > * {
          /* Items are hidden using height and opacity to retain focus */
          opacity: 0;
          height: 0;
        }
      }

      &:not(.indicator) {
        opacity: 0.5;
      }

      .TreeItemWrapper > * {
        box-shadow: none;
        background-color: transparent;
      }
    `}

    ${({ ghost, indicator }) =>
    ghost &&
    !indicator &&
    css`
      opacity: 0.5;
    `}

    ${({ disableInteraction }) =>
    disableInteraction &&
    css`
      pointer-events: none;
    `}

    ${({ disableInteraction, clone }) =>
    disableInteraction &&
    clone &&
    css`
      .Text,
      .Count {
        user-select: none;
        -webkit-user-select: none;
      }
    `}
`

const TreeItemWrapper = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  ${sp`
    padding: 10px 10px; 
  `}
  color: ${Color.BLACK};
  box-sizing: border-box;
`

const Text = styled.span`
  flex-grow: 1;
  padding-left: 0.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  user-select: none;
`

const Count = styled.span`
  position: absolute;
  top: 5px;
  right: 14px;
  ${sp`
    top: 10px;
    right: 14px;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${Color.BLUE};
  font-size: 0.8rem;
  font-weight: 600;
  color: ${Color.WHITE};
`

const ActionWrapper = styled.div<{ collapsed: boolean }>`
  cursor: pointer;
  svg {
    transition: transform 250ms ease;
  }

  ${({ collapsed }) =>
    collapsed &&
    css`
      transform: rotate(-90deg);
    `}
`

const CollapseIconWrapper = styled.div`
  cursor: pointer;
`
