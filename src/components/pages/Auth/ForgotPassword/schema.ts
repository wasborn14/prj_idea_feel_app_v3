import {
  ERROR_AUTH_ENTER_EMAIL,
  ERROR_AUTH_ENTER_EMAIL_CORRECT_FORMAT,
  ERROR_LIMIT_WORDS_100
} from '@/const/errorMessages'
import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .email(ERROR_AUTH_ENTER_EMAIL_CORRECT_FORMAT)
    .max(100, ERROR_LIMIT_WORDS_100)
    .required(ERROR_AUTH_ENTER_EMAIL)
})

export type Schema = yup.InferType<typeof schema>
