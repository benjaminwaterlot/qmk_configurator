import { combineReducers } from '@reduxjs/toolkit'
import keyboards from './keyboards'
import keymaps from './keymaps'

const reducer = combineReducers({
  keyboards: keyboards.reducer,
  keymaps: keymaps.reducer,
})

export default reducer
