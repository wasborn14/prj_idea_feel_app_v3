import { ERROR_AUTH_ENTER_PASSWORD, ERROR_LIMIT_WORDS_30 } from '@/const/errorMessages'
import * as yup from 'yup'

export const schema = yup.object({
  password: yup.string().max(30, ERROR_LIMIT_WORDS_30).required(ERROR_AUTH_ENTER_PASSWORD),
  re_password: yup.string().max(30, ERROR_LIMIT_WORDS_30).required(ERROR_AUTH_ENTER_PASSWORD)
})

export type Schema = yup.InferType<typeof schema>
