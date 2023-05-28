import React, { forwardRef, useState } from 'react'

import { Handle } from '@/components/atoms/DndItems'
import { Addition } from '@/components/atoms/DndItems/Addition'
import { Color } from '@/const'
import styled from 'styled-components'
import { createViewTitle } from '../../utilities'
import { ContainerInput } from '../ContainerInput'
import { Trash } from '@/components/atoms/DndItems/Trash'
export interface ContainerProps {
  children: React.ReactNode
  columns?: number
  label?: string
  style?: React.CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: React.HTMLAttributes<any>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
  onRemove?(): void
  onAdditionClick?: (label: string) => void
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      columns = 1,
      handleProps,
      onClick,
      onRemove,
      onAdditionClick,
      label,
      placeholder,
      style,
      ...props
    }: ContainerProps,
    ref
  ) => {
    const [isEdit, setIsEdit] = useState(false)
    const viewTitle = createViewTitle(label ?? '')

    return (
      <Component
        {...props}
        ref={ref}
        style={
          {
            ...style,
            '--columns': columns
          } as React.CSSProperties
        }
        as={onClick ? 'button' : 'div'}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <>
            {isEdit ? (
              <ContainerInput label={label} onOutsideClick={() => setIsEdit(false)} />
            ) : (
              <ContainerHeader>
                <ContainerLabel onClick={() => setIsEdit(true)}>{viewTitle}</ContainerLabel>
                <ContainerActionWrapper>
                  <Handle {...handleProps} onClick={() => {}} />
                </ContainerActionWrapper>
              </ContainerHeader>
            )}
            <AdditionWrapper>
              <Addition
                onClick={() => {
                  onAdditionClick && onAdditionClick(label)
                }}
              />
            </AdditionWrapper>
            <DeleteWrapper
              onClick={() => {
                onAdditionClick && onAdditionClick(label)
              }}
            >
              <Trash onClick={onRemove} />
            </DeleteWrapper>
          </>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </Component>
    )
  }
)

const Component = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  grid-auto-rows: max-content;
  overflow: hidden;
  box-sizing: border-box;
  appearance: none;
  outline: none;
  min-width: 320px;
  margin: 10px;
  padding-bottom: 24px;
  border-radius: 5px;
  min-height: 200px;
  transition: background-color 350ms ease;
  background-color: ${Color.BACKGROUND_COLOR2};
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 1em;
  box-shadow: 0 1px 10px 0 rgba(34, 33, 81, 0.1);

  ul {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(var(--columns, 1), 1fr);
    list-style: none;
    padding: 20px 0px 20px 20px;
    margin: 0;
  }
`

const ContainerHeader = styled.div`
  display: flex;
  padding: 5px 20px;
  padding-right: 8px;
  align-items: center;
  justify-content: space-between;
  background-color: ${Color.WHITE};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`

const ContainerLabel = styled.div`
  width: 100%;
  max-width: 260px;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ContainerActionWrapper = styled.div`
  display: flex;
`

const AdditionWrapper = styled.div`
  position: absolute;
  bottom: 4px;
  right: 8px;
  opacity: 0.5;
`

const DeleteWrapper = styled.div`
  position: absolute;
  bottom: 4px;
  left: 8px;
  opacity: 0.5;
`
