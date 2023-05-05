import { useLayoutEffect, useState } from 'react'
import { useUach } from '../useUach'
import { UAParser } from 'ua-parser-js'

const uaParser = new UAParser()

export const useIsSpDevice = (): boolean => {
  const ch = useUach()
  const [isSp, setIsSp] = useState(false)

  useLayoutEffect(() => {
    if (ch.platform !== '') {
      ch.mobile && setIsSp(true)
    }
    uaParser.getDevice().type ? setIsSp(true) : setIsSp(false)
  }, [ch])

  return isSp
}
