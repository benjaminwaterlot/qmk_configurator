import { combineReducers } from '@reduxjs/toolkit'
// import test from './test'
import keyboards from './keyboards'

const reducer = combineReducers({
  // test,
  keyboards: keyboards.reducer,
})

export default reducer
