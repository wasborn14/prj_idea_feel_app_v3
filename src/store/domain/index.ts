import { combineReducers } from '@reduxjs/toolkit'

import { reducer as profile } from './profile'
import { reducer as ideaList } from './ideaList'
import { reducer as feelList } from './feelList'
import { reducer as feelReasonList } from './feelReasonList'
import { reducer as feelReasonSelectList } from './feelReasonSelectList'

export const reducer = combineReducers({
  profile,
  ideaList,
  feelList,
  feelReasonList,
  feelReasonSelectList
})
