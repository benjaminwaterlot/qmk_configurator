import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { KeyboardsState } from './keyboards'

import reducer from './reducer'

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
// }

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof reducer>
// export type RootState = {
//   test: {
//     sentence: number | undefined
//     cursorAt: number
//     input: string
//   }
//   keyboards: KeyboardsState
// }

export default store
