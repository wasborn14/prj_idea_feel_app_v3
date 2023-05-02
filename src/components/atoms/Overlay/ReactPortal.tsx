import { ReactNode, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type ReactPortalProps = {
  children: ReactNode
  wrapperId: string
}

export function ReactPortal({ children, wrapperId = 'react-portal' }: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null)

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false

    if (element?.parentNode) {
      console.error(`${wrapperId} is already exists. please set another Id. `)
    }

    if (!element) {
      systemCreated = true
      element = createWrapperAndAppendToBody(wrapperId)
    }
    setWrapperElement(element)

    return () => {
      // delete created element
      if (element && systemCreated && element.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  // wrapperElement state will be null on the very first render
  if (wrapperElement === null) return null
  return createPortal(children, wrapperElement)
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}
