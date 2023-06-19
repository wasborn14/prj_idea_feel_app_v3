import { ERROR_ENTER_FEEL_REASON, ERROR_LIMIT_WORDS_30 } from '@/const/errorMessages'
import * as yup from 'yup'

export const schema = yup.object({
  title: yup.string().max(30, ERROR_LIMIT_WORDS_30).required(ERROR_ENTER_FEEL_REASON)
})

export type Schema = yup.InferType<typeof schema>
