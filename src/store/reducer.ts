import { combineReducers } from '@reduxjs/toolkit'
import keyboards from './keyboards'

const reducer = combineReducers({
  keyboards: keyboards.reducer,
})

export default reducer
