import {
  ERROR_AUTH_ENTER_NEW_PASSWORD,
  ERROR_AUTH_ENTER_PASSWORD,
  ERROR_AUTH_ENTER_PASSWORD_SAME,
  ERROR_LIMIT_WORDS_30
} from '@/const/errorMessages'
import * as yup from 'yup'

export const schema = yup.object({
  current_password: yup.string().max(30, ERROR_LIMIT_WORDS_30).required(ERROR_AUTH_ENTER_PASSWORD),
  new_password: yup.string().max(30, ERROR_LIMIT_WORDS_30).required(ERROR_AUTH_ENTER_NEW_PASSWORD),
  re_new_password: yup
    .string()
    .max(30, ERROR_LIMIT_WORDS_30)
    .required(ERROR_AUTH_ENTER_NEW_PASSWORD)
    .oneOf([yup.ref('new_password')], ERROR_AUTH_ENTER_PASSWORD_SAME)
})

export type Schema = yup.InferType<typeof schema>
