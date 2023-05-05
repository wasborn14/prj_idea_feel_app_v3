import { useEffect, useState } from 'react'

type Brand = { brand: string; version: string }

type UaChValues = {
  architecture: string
  brands: Brand[]
  mobile: boolean
  model: string
  platform: string
  platformVersion: string
  uaFullVersion: string
}

export const useUach = () => {
  const [ch, setCh] = useState<UaChValues>({
    architecture: '',
    brands: [],
    mobile: false,
    model: '',
    platform: '',
    platformVersion: '',
    uaFullVersion: ''
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-expect-error
      if (!navigator.userAgentData) return
      // @ts-expect-error
      const uaData = navigator.userAgentData
      ;(async () => {
        const highEntropyValues = await uaData.getHighEntropyValues([
          'platform',
          'platformVersion',
          'architecture',
          'model',
          'uaFullVersion',
          'mobile'
        ])
        setCh((prev) => ({
          ...prev,
          ...highEntropyValues
        }))
      })()
    }
  }, [])
  return ch
}
