import { UniqueIdentifier } from '@dnd-kit/core'

export const getColor = (id: UniqueIdentifier) => {
  switch (String(id)[0]) {
    case 'A':
      return '#7193f1'
    case 'B':
      return '#ffda6c'
    case 'C':
      return '#00bcd4'
    case 'D':
      return '#ef769f'
  }

  return undefined
}
