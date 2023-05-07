import { Color } from '@/const'
import { ReactNode, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

export const CLASS_PREVENT_DOUBLE_CLICK_BUTTON = 'PREVENT_DOUBLE_CLICK_BUTTON'
const _CLASS_DISABLED_FOR_PREVENT_DOUBLE_CLICK = 'DISABLED_FOR_PREVENT_DOUBLE_CLICK'

export const resetDisableButton = (button: HTMLButtonElement) => {
  if (!button.classList.contains(_CLASS_DISABLED_FOR_PREVENT_DOUBLE_CLICK)) {
    console.error('not found disable className')
  }
  button.classList.remove(_CLASS_DISABLED_FOR_PREVENT_DOUBLE_CLICK)
}

export const asyncResetDisableButton = (button: HTMLButtonElement) => {
  setTimeout(() => {
    resetDisableButton(button)
  })
}

type Props = {
  children: ReactNode
}

const PreventDoubleClickStyle = createGlobalStyle`
  button.${_CLASS_DISABLED_FOR_PREVENT_DOUBLE_CLICK}{
    pointer-events: none;
    background-color: ${Color.GRAY_CC} !important;
    color: ${Color.WHITE} !important;
    cursor: default !important;
  }
`

export const PreventDoubleClick = ({ children }: Props) => {
  useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLButtonElement
      const oneTimeClickableButton: HTMLButtonElement = target.closest(
        `button.${CLASS_PREVENT_DOUBLE_CLICK_BUTTON}`
      ) as HTMLButtonElement
      if (oneTimeClickableButton) {
        oneTimeClickableButton.classList.add(_CLASS_DISABLED_FOR_PREVENT_DOUBLE_CLICK)
      }
    }
    document.addEventListener('click', handler, false)
    return () => {
      document.removeEventListener('click', handler, false)
    }
  }, [])
  return (
    <>
      <PreventDoubleClickStyle />
      {children}
    </>
  )
}
