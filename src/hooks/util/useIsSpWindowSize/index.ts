import { useWindowSize } from '../useWindowSize'

export const useIsSpWindowSize = (): boolean => {
  const [width] = useWindowSize()
  return width < 1025 ? true : false
}
