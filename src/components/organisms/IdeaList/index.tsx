import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal, unstable_batchedUpdates } from 'react-dom'
import {
  CancelDrop,
  closestCenter,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  Modifiers,
  UniqueIdentifier,
  useSensors,
  useSensor,
  MeasuringStrategy,
  KeyboardCoordinateGetter,
  defaultDropAnimationSideEffects,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { coordinateGetter as multipleContainersCoordinateGetter } from '@/utils/dnd/multipleContainersKeyboardCoordinates'

import { Item } from './Items/Item'
import { SortableItem } from './Items/SortableItem'

import { getColor } from '@/utils/dnd/getColor'
import { DroppableContainer } from './Containers/DroppableContainer'
import { useDispatch, useSelector } from 'react-redux'
import { actions as ideaListActions, ideaContainersDataSelector, ideaListDataSelector } from '@/store/domain/ideaList'
import { IdeaListModel } from '@/store/domain/ideaList/types'
import { ItemInput } from './Items/ItemInput'
import { AdditionalContainer } from './Containers/AdditionalContainer'
import { Container } from './Containers/Container'
import styled, { css } from 'styled-components'
import { mainContentsWidthSelector } from '@/store/app/window'
import { useIsSp } from '@/hooks/util/useIsSp'
import { useRouter } from 'next/router'
import { RESET_CATEGORY_ID } from '@/store/app/category'
import { useGetIdeaList, usePutIdeaList } from '@/hooks/api/idea'
import { LoadingCenter } from '@/components/mlecules/Loading'

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5'
      }
    }
  })
}

type Items = Record<UniqueIdentifier, UniqueIdentifier[]>

interface Props {
  adjustScale?: boolean
  cancelDrop?: CancelDrop
  columns?: number
  containerStyle?: React.CSSProperties
  coordinateGetter?: KeyboardCoordinateGetter
  getItemStyles?(args: {
    value: UniqueIdentifier
    index: number
    overIndex: number
    isDragging: boolean
    containerId: UniqueIdentifier
    isSorting: boolean
    isDragOverlay: boolean
  }): React.CSSProperties
  wrapperStyle?(args: { index: number }): React.CSSProperties
  itemCount?: number
  items?: Items
  handle?: boolean
  renderItem?: any
  strategy?: SortingStrategy
  modifiers?: Modifiers
  minimal?: boolean
  trashable?: boolean
  scrollable?: boolean
  vertical?: boolean
}

export const TRASH_ID = 'void'
const PLACEHOLDER_ID = 'placeholder'

export const IdeaList = ({
  cancelDrop,
  columns,
  handle = true,
  containerStyle,
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  modifiers,
  renderItem,
  strategy = verticalListSortingStrategy,
  vertical,
  scrollable
}: Props) => {
  const dispatch = useDispatch()
  const items = useSelector(ideaListDataSelector)
  const containers = useSelector(ideaContainersDataSelector)
  const isPc = !useIsSp()
  const mainContentsWidth: number = useSelector(mainContentsWidthSelector)
  const router = useRouter()
  const categoryId = String(router.query['category-id'] ?? RESET_CATEGORY_ID)

  const { isLoading } = useGetIdeaList(categoryId)
  const { mutate: putIdeaListMutate } = usePutIdeaList()

  // ドラッグしている対象のID
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const isMovedOtherContainer = useRef(false)
  const [newItemContainerId, setNewItemContainerId] = useState<UniqueIdentifier | null>(null)
  // 最後に衝突した対象のID
  const lastOverId = useRef<UniqueIdentifier | null>(null)
  const recentlyMovedToNewContainer = useRef(false)
  // ドラッグしている対象のコンテナid
  const isSortingContainer = activeId ? containers.includes(activeId) : false

  /**
   * カスタム衝突検出(closetCenterを補うために導入)：
   * コンテナ自身の移動＞中身の移動の判定を行う
   * 交差する対象がない場合は、最後に一致した対象を返す。
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      // コンテナのドラッグ＆ドロップを行う時の判定
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) => container.id in items)
        })
      }

      // ドロップ可能な対象があるか探す
      const pointerIntersections = pointerWithin(args)
      const intersections =
        pointerIntersections.length > 0
          ? // ドロップ可能な交差する対象がある場合、それを返す
            pointerIntersections
          : rectIntersection(args)
      let overId = getFirstCollision(intersections, 'id')

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId]

          if (containerItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => container.id !== overId && containerItems.includes(container.id)
              )
            })[0]?.id
          }
        }

        lastOverId.current = overId

        return [{ id: overId }]
      }

      // レイアウトがずれてnullになる場合があるため、対策としてlastOverIdを手動で設定。
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId
      }

      // 一致するドロップ可能対象がない場合は、最後の一致を返す
      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeId, items]
  )
  // ドラッグした瞬間のitemsを記録しておき、変化がないときは戻す
  const [clonedItems, setClonedItems] = useState<Items | null>(null)
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter
    })
  )
  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id
    }

    return Object.keys(items).find((key) => items[key].includes(id))
  }

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id)

    if (!container) {
      return -1
    }

    const index = items[container].indexOf(id)

    return index
  }

  // ドラッグ時のイベント

  const onDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)
    setClonedItems(items)
  }

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    const overId = over?.id

    if (overId == null || overId === TRASH_ID || active.id in items) {
      return
    }

    const overContainer = findContainer(overId)
    const activeContainer = findContainer(active.id)

    if (!overContainer || !activeContainer) {
      return
    }

    if (activeContainer !== overContainer) {
      isMovedOtherContainer.current = true
      const newItems = () => {
        const activeItems = items[activeContainer]
        const overItems = items[overContainer]
        const overIndex = overItems.indexOf(overId)
        const activeIndex = activeItems.indexOf(active.id)

        let newIndex: number

        if (overId in items) {
          newIndex = overItems.length + 1
        } else {
          const isBelowOverItem =
            over &&
            active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height

          const modifier = isBelowOverItem ? 1 : 0

          newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1
        }

        recentlyMovedToNewContainer.current = true

        return {
          ...items,
          [activeContainer]: items[activeContainer].filter((item) => item !== active.id),
          [overContainer]: [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(newIndex, items[overContainer].length)
          ]
        }
      }
      dispatch(ideaListActions.setIdeaListData({ ideaList: newItems() }))
    }
  }

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    // 他のコンテナに移動時、値の更新
    if (isMovedOtherContainer.current) {
      isMovedOtherContainer.current = false
      putIdeaListMutate(
        { categoryId, items },
        {
          onError: () => console.error('put idea update error')
        }
      )
    }

    // コンテナの入れ替え
    if (active.id in items && over?.id) {
      const activeIndex = containers.indexOf(active.id)
      const overIndex = containers.indexOf(over.id)

      const modifiedContainers = arrayMove(containers, activeIndex, overIndex)
      dispatch(ideaListActions.setIdeaContainersData({ ideaContainers: modifiedContainers }))

      const modifiedItems: IdeaListModel = {}
      modifiedContainers.map((value) => {
        modifiedItems[value] = items[value]
      })

      putIdeaListMutate(
        { categoryId, items: modifiedItems },
        {
          onError: () => console.error('put idea update error')
        }
      )
    }

    const activeContainer = findContainer(active.id)

    if (!activeContainer) {
      setActiveId(null)
      return
    }

    const overId = over?.id

    if (overId == null) {
      setActiveId(null)
      return
    }

    if (overId === PLACEHOLDER_ID) {
      const newContainerId = getNextContainerId()

      unstable_batchedUpdates(() => {
        dispatch(ideaListActions.setIdeaContainersData({ ideaContainers: [...containers, newContainerId] }))
        dispatch(
          ideaListActions.setIdeaListData({
            ...items,
            [activeContainer]: items[activeContainer].filter((id) => id !== activeId),
            [newContainerId]: [active.id]
          })
        )
        setActiveId(null)
      })
      return
    }

    const overContainer = findContainer(overId)

    if (overContainer) {
      const activeIndex = items[activeContainer].indexOf(active.id)
      const overIndex = items[overContainer].indexOf(overId)

      if (activeIndex !== overIndex) {
        const modifiedItems = {
          ...items,
          [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
        }
        dispatch(
          ideaListActions.setIdeaListData({
            ideaList: modifiedItems
          })
        )
        putIdeaListMutate(
          { categoryId, items: modifiedItems },
          {
            onError: () => console.error('put idea update error')
          }
        )
      }
    }

    setActiveId(null)
  }

  const onDragCancel = () => {
    if (clonedItems) {
      // コンテナ外でドロップされた場合、状態をリセットする
      dispatch(ideaListActions.setIdeaListData({ ideaList: clonedItems }))
    }

    setActiveId(null)
    setClonedItems(null)
  }

  const renderContainerDragOverlay = (containerId: UniqueIdentifier) => {
    return (
      <Container
        label={containerId.toString()}
        columns={columns}
        style={{
          height: '100%'
        }}
        shadow
        unstyled={false}
        onAdditionClick={() => {
          setNewItemContainerId(containerId)
        }}
      >
        {items[containerId].map((item, index) => (
          <Item
            key={item}
            containerId={findContainer(item) as UniqueIdentifier}
            value={item}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              value: item,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false
            })}
            color={getColor(item)}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
            onRemove={() => {}}
          />
        ))}
      </Container>
    )
  }

  const renderSortableItemDragOverlay = (id: UniqueIdentifier) => {
    return (
      <Item
        containerId={findContainer(id) as UniqueIdentifier}
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id) as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true
        })}
        color={getColor(id)}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
        onRemove={() => {}}
      />
    )
  }

  // コンテナの操作
  const handleRemove = (containerID: UniqueIdentifier) => {
    dispatch(ideaListActions.setIdeaContainersData({ ideaContainers: containers.filter((id) => id !== containerID) }))
    const removedItems: Items = {}
    for (let id in items) {
      if (id !== containerID) {
        removedItems[id] = items[id]
      }
    }
    dispatch(ideaListActions.setIdeaListData({ ideaList: removedItems }))
    putIdeaListMutate(
      { categoryId, items: removedItems },
      {
        onError: () => console.error('put idea update error')
      }
    )
  }

  // アイテムの操作
  const handleItemRemove = (containerId: UniqueIdentifier, itemId: React.ReactNode) => {
    const removedItems = {
      ...items,
      [containerId]: items[containerId].filter((item) => item !== itemId)
    }
    dispatch(
      ideaListActions.setIdeaListData({
        ideaList: removedItems
      })
    )
    putIdeaListMutate(
      { categoryId, items: removedItems },
      {
        onError: () => console.error('put idea update error')
      }
    )
  }

  const getNextContainerId = () => {
    const containerIds = Object.keys(items)
    const lastContainerId = containerIds[containerIds.length - 1]

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1)
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false
    })
  }, [items])

  return (
    <DndContext
      id='context'
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always
        }
      }}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <LoadingCenter isLoading={isLoading} />
      <GridContainer isPc={isPc} mainContentsWidth={mainContentsWidth}>
        <SortableContext
          items={[...containers, PLACEHOLDER_ID]}
          strategy={vertical ? verticalListSortingStrategy : horizontalListSortingStrategy}
        >
          {containers.map((containerId) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              label={containerId.toString()}
              columns={columns}
              items={items[containerId]}
              scrollable={scrollable}
              style={containerStyle}
              onRemove={() => handleRemove(containerId)}
              onAdditionClick={(label: string) => {
                setNewItemContainerId(label)
              }}
            >
              <SortableContext items={items[containerId]} strategy={strategy}>
                {items[containerId].map((value, index) => {
                  return (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={value}
                      id={value}
                      index={index}
                      onRemove={handleItemRemove}
                      handle={handle}
                      style={getItemStyles}
                      wrapperStyle={wrapperStyle}
                      renderItem={renderItem}
                      containerId={containerId}
                      getIndex={getIndex}
                    />
                  )
                })}
              </SortableContext>
              {newItemContainerId === containerId && (
                <ItemInput isNew containerId={containerId} onInputClose={() => setNewItemContainerId(null)} />
              )}
            </DroppableContainer>
          ))}
          <AdditionalContainer />
        </SortableContext>
      </GridContainer>
      {typeof window === 'object' &&
        createPortal(
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId
              ? containers.includes(activeId)
                ? renderContainerDragOverlay(activeId)
                : renderSortableItemDragOverlay(activeId)
              : null}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  )
}

const GridContainer = styled.div<{ isPc: boolean; mainContentsWidth: number }>`
  ${({ isPc }) =>
    isPc &&
    css`
      display: grid;
      box-sizing: border-box;
    `}

  ${({ mainContentsWidth }) => {
    if (mainContentsWidth >= 1530) {
      return css`
        grid-template-columns: repeat(4, 1fr);
      `
    } else if (mainContentsWidth >= 1165) {
      return css`
        grid-template-columns: repeat(3, 1fr);
      `
    } else {
      return css`
        grid-template-columns: repeat(2, 1fr);
      `
    }
  }}
`
