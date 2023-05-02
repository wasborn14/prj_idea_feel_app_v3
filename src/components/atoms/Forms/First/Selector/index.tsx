import { DownArrowIcon } from '@/components/atoms/Icons/Arrows/DownArrow'
import { Spacer } from '@/components/atoms/Spacer'
import { Color } from '@/const'
import { fontStyles } from '@/const/font'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type Value = string

export type Option = {
  text: React.ReactNode
  value: Value
}

type OptionStyle = {
  selected?: {
    backgroundColor?: string
  }
  hover?: {
    backgroundColor?: string
  }
}

export type Props = {
  options: Option[]
  selectedValue?: Value
  placeholder: string
  isDisabled?: boolean
  isError?: boolean
  onClick: (value: Option) => void
  onBlur?: () => void
  notShowWrapper?: boolean
  maxHeight?: number
  width?: number
  height?: number
  noRadius?: 'right' | 'left'
  optionsPos?: 'top' | 'bottom'
  optionStyle?: OptionStyle
}

export const Selector = ({
  options,
  selectedValue,
  placeholder,
  isDisabled,
  isError,
  onClick,
  onBlur,
  notShowWrapper,
  maxHeight,
  width = 100,
  height = 36,
  noRadius,
  optionsPos = 'bottom',
  optionStyle
}: Props) => {
  const [isShowDropDown, setIsShowDropDown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsShowDropDown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [containerRef])

  const selectedText =
    options.length === 0 || typeof selectedValue === 'undefined'
      ? placeholder
      : options.find((option) => option.value === selectedValue)?.text ?? placeholder

  return (
    <Wrapper ref={containerRef} onBlur={onBlur} width={width} tabIndex={0}>
      <CustomSelect
        isDisabled={isDisabled}
        isError={isError}
        noRadius={noRadius}
        onClick={() => setIsShowDropDown(!isShowDropDown)}
        height={height}
        notShowWrapper={notShowWrapper}
      >
        <TextWrapper>{selectedText}</TextWrapper>
        <DownArrowIcon size={20} />
        <Spacer x={9} />
      </CustomSelect>

      {isShowDropDown && (
        <CustomOptions
          width={width}
          height={height}
          maxHeight={maxHeight}
          isHidden={options.length === 0}
          optionsPos={optionsPos}
        >
          {options.map((option) => (
            <CustomOption
              {...optionStyle}
              selected={option.value === selectedValue}
              onClick={() => {
                onClick(option)
                setIsShowDropDown(false)
              }}
              key={option.value}
            >
              {option.text}
            </CustomOption>
          ))}
        </CustomOptions>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<Pick<Props, 'width'>>`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
`

const borderRadius = (notRadius: 'left' | 'right' | undefined) => {
  switch (notRadius) {
    case 'left':
      return '0px 4px 4px 0px'
    case 'right':
      return '4px 0px 0px 4px'
    default:
      return '4px'
  }
}

const CustomSelect = styled.div<Pick<Props, 'height' | 'noRadius' | 'notShowWrapper' | 'isError' | 'isDisabled'>>`
  position: relative;
  display: flex;
  align-items: center;
  height: ${({ height }) => height}px;
  width: 100%;
  border-radius: ${({ noRadius }) => borderRadius(noRadius)};
  border-width: 11px;
  color: ${Color.GRAY_33};
  ${fontStyles['12px']}
  border: ${({ isError, notShowWrapper }) =>
    isError ? `2px solid ${Color.ERROR_COLOR}` : notShowWrapper ? 'transparent' : `1px solid ${Color.GRAY_CC}`};
  background-color: ${({ isDisabled }) => (isDisabled ? Color.GRAY_F6 : 'transparent')};
  pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'auto')};
  white-space: nowrap;
  overflow: hidden;
`

const TextWrapper = styled.div`
  overflow: hidden;
  padding-left: 9px;
  width: calc(100% - 24px);
`

const CustomOptions = styled.div<Pick<Props, 'width' | 'height' | 'maxHeight' | 'optionsPos'> & { isHidden: boolean }>`
  visibility: ${({ isHidden }) => (isHidden ? 'hidden' : 'visible')};
  position: absolute;
  ${({ optionsPos, height }) => (optionsPos ? `top:${height}px` : `bottom:${height}px`)};
  z-index: 1;
  width: ${({ width }) => width}px;
  max-height: ${({ maxHeight }) => maxHeight ?? 200}px;
  overflow-y: scroll;
  background-color: ${Color.WHITE};
  border: 1px solid ${Color.GRAY_CC};
  cursor: pointer;
  white-space: normal;
  // hidden scroll bar
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

const CustomOption = styled.div<{ selected: boolean; optionStyle?: OptionStyle }>`
  min-height: 36px;
  margin: 0;
  padding: 10px 8px;
  display: flex;
  align-items: center;
  background-color: ${({ selected, optionStyle }) =>
    selected ? optionStyle?.selected?.backgroundColor ?? Color.GRAY_F6 : 'transparent'};
  font-weight: ${({ selected }) => (selected ? 600 : 'normal')};
  &:hover {
    background-color: ${({ optionStyle }) => optionStyle?.hover?.backgroundColor ?? Color.GRAY_F6};
  }
`
