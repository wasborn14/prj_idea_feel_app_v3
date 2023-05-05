import {
  ERROR_AUTH_ENTER_EMAIL,
  ERROR_AUTH_ENTER_EMAIL_CORRECT_FORMAT,
  ERROR_AUTH_ENTER_NAME,
  ERROR_AUTH_ENTER_PASSWORD,
  ERROR_LIMIT_WORDS_30,
  ERROR_LIMIT_WORDS_100
} from '@/const/errorMessages'
import * as yup from 'yup'

export const schema = yup.object({
  name: yup.string().max(30, ERROR_LIMIT_WORDS_30).required(ERROR_AUTH_ENTER_NAME),
  email: yup
    .string()
    .email(ERROR_AUTH_ENTER_EMAIL_CORRECT_FORMAT)
    .max(100, ERROR_LIMIT_WORDS_100)
    .required(ERROR_AUTH_ENTER_EMAIL),
  password: yup.string().max(30, ERROR_LIMIT_WORDS_30).required(ERROR_AUTH_ENTER_PASSWORD),
  re_password: yup.string().max(30, ERROR_LIMIT_WORDS_30).required(ERROR_AUTH_ENTER_PASSWORD)
  // 上手く動作しないためindex.tsxの方で対応
  // .oneOf([yup.ref("password")], ERROR_AUTH_ENTER_PASSWORD_SAME),
})

export type Schema = yup.InferType<typeof schema>
