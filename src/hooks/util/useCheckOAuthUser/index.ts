import { providerDataSelector } from '@/store/domain/profile'
import { useSelector } from 'react-redux'

export const useCheckOAuthUser = () => {
  const provider = useSelector(providerDataSelector)
  return provider === '' ? false : true
}
