import { combineReducers } from '@reduxjs/toolkit'

import { reducer as profile } from './profile'
import { reducer as tabList } from './tabList'
import { reducer as ideaList } from './ideaList'
import { reducer as feelGraph } from './feelGraph'
import { reducer as feelReasonList } from './feelReasonList'
import { reducer as feelReasonSelectList } from './feelReasonSelectList'

export const reducer = combineReducers({
  profile,
  tabList,
  ideaList,
  feelGraph,
  feelReasonList,
  feelReasonSelectList
})
