import { ERROR_AUTH_ENTER_EMAIL, ERROR_LIMIT_WORDS_100 } from "src/const/errorMessages";
import * as yup from "yup";

export const schema = yup.object({
  new_email: yup.string().email().max(100, ERROR_LIMIT_WORDS_100).required(ERROR_AUTH_ENTER_EMAIL),
});

export type Schema = yup.InferType<typeof schema>;
