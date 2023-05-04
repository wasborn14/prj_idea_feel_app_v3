import { combineReducers } from '@reduxjs/toolkit'

import { reducer as data } from './data'
import { reducer as window } from './window'
import { reducer as page } from './page'
import { reducer as auth } from './auth'
import { reducer as category } from './category'
// import { reducer as memo } from './memo'
// import { reducer as blog } from './blog'
// import { reducer as context } from './context'
// import { reducer as drag } from './drag'

export const reducer = combineReducers({
  data,
  window,
  page,
  auth,
  category
  //   memo,
  //   blog,
  //   context,
  //   drag
})
