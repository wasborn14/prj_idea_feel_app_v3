import { actions } from '@/store/domain/profile'
import { useDispatch } from 'react-redux'

export const useResetUserProfile = () => {
  const dispatch = useDispatch()
  dispatch(actions.setProfileData({ name: '', email: '', provider: '' }))
}
