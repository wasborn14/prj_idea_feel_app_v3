import { DropAnimation, MeasuringStrategy, Modifier, defaultDropAnimation } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

// new move
export const dropAnimationConfig: DropAnimation = {
  keyframes({ transform }) {
    return [
      { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
      {
        opacity: 0,
        transform: CSS.Transform.toString({
          ...transform.final,
          x: transform.final.x + 5,
          y: transform.final.y + 5
        })
      }
    ]
  },
  easing: 'ease-out',
  sideEffects({ active }) {
    active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: defaultDropAnimation.duration,
      easing: defaultDropAnimation.easing
    })
  }
}

export const measuring = {
  droppable: {
    strategy: MeasuringStrategy.Always
  }
}

export const adjustTranslate: Modifier = ({ transform }) => {
  return {
    ...transform,
    y: transform.y - 25
  }
}
