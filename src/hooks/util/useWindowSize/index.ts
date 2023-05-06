import { useState } from 'react'
import { useIsomorphicEffect } from '../useIsomorphicEffect'

export const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0])
  const isomorphicEffect = useIsomorphicEffect()

  isomorphicEffect(() => {
    const updateSize = (): void => {
      setSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [])
  return size
}
