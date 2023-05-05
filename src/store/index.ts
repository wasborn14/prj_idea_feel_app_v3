import { configureStore } from '@reduxjs/toolkit'

import { reducer as domain } from './domain'
import { reducer as app } from './app'
// import { reducer as ui } from "./ui";

// domain:アプリケーションが表示したり変更するデータ
// app:データの選択状態やデータフェッチのローディング状態
// ui:モーダルが開かれているかどうか
const rootReducer = {
  domain,
  app
  //   ui,
}

export const store = configureStore({
  reducer: rootReducer
})

export type AllState = ReturnType<typeof store.getState>
